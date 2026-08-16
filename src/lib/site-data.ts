import fs from "fs/promises";
import path from "path";

// Define the database enum-like values for typescript compatibility
export type ProjectCategory = "MURAL" | "INTERIOR" | "COMMERCIAL" | "CUSTOM";
export type ProjectWorkType = "SOLO" | "COLLABORATIVE";
export type MediaType = "IMAGE" | "VIDEO" | "YOUTUBE" | "INSTAGRAM" | "INSTAGRAM-REEL" | "INSTAGRAM-GALLERY";

export interface MediaItem {
  id: string;
  projectId: string;
  mediaType: MediaType;
  url: string;
  altText: string | null;
  sortOrder: number;
}

export interface ProjectMedia {
  mediaType: string;
  url: string;
  altText: string | null;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: ProjectCategory;
  workType: ProjectWorkType;
  status: "upcoming" | "in-progress" | "completed";
  location: string | null;
  completedAt: string | null;
  coverMediaUrl: string | null;
  isFeatured: boolean;
  isCoverProject: boolean;
  isPublished: boolean;
  media: ProjectMedia[];
  teamMembers: Array<{
    teamMember: {
      id: string;
      name: string;
      slug: string;
    };
  }>;
}

export interface TeamMember {
  id: string;
  name: string;
  slug: string;
  bio: string;
  specialization: string;
  profileImageUrl: string | null;
  instagramUrl: string | null;
  isActive: boolean;
}

export interface TeamMemberWithProjects extends TeamMember {
  projectMembers: Array<{
    project: {
      id: string;
      title: string;
      slug: string;
      category: ProjectCategory;
      workType: ProjectWorkType;
      coverMediaUrl: string | null;
      isFeatured: boolean;
    };
  }>;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string | null;
}

export interface BrandSetting {
  brandName: string;
  tagline: string;
  email: string | null;
  instagramUrl: string | null;
  whatsappUrl: string | null;
  commonGallery: ProjectMedia[];
}

const contentDir = path.join(process.cwd(), "content");

async function readJsonFile<T>(filePath: string): Promise<T | null> {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data) as T;
  } catch {
    return null;
  }
}

export async function getBrand(): Promise<BrandSetting | null> {
  const brandPath = path.join(contentDir, "brand", "index.json");
  try {
    const fileContents = await fs.readFile(brandPath, "utf8");
    const data = JSON.parse(fileContents);
    return {
      brandName: data.brandName || "KalaiSuvadu",
      tagline: data.tagline || "",
      email: data.email || null,
      instagramUrl: data.instagram || null,
      whatsappUrl: data.whatsapp || null,
      commonGallery: Array.isArray(data.commonGallery)
        ? data.commonGallery.map((item: any) => ({
          mediaType: item.type || "image",
          url: item.url || "",
          altText: item.alt || null,
        }))
        : [],
    };
  } catch (error) {
    return null;
  }
}

async function getRawProjects(): Promise<any[]> {
  try {
    const projectsDir = path.join(contentDir, "projects");
    const items = await fs.readdir(projectsDir);
    const projects: any[] = [];

    for (const item of items) {
      const stats = await fs.stat(path.join(projectsDir, item));
      if (stats.isDirectory()) {
        const projectData = await readJsonFile<any>(path.join(projectsDir, item, "index.json"));
        if (projectData) {
          projects.push({
            ...projectData,
            id: item,
            slug: item,
          });
        }
      }
    }
    return projects;
  } catch {
    return [];
  }
}

async function getRawTeamMembers(): Promise<any[]> {
  try {
    const teamDir = path.join(contentDir, "team");
    const items = await fs.readdir(teamDir);
    const members: any[] = [];

    for (const item of items) {
      const stats = await fs.stat(path.join(teamDir, item));
      if (stats.isDirectory()) {
        const memberData = await readJsonFile<any>(path.join(teamDir, item, "index.json"));
        if (memberData) {
          members.push({
            ...memberData,
            id: item,
            slug: item,
          });
        }
      }
    }
    return members;
  } catch {
    return [];
  }
}

export async function getAllProjects(): Promise<Project[]> {
  const [rawProjects, rawTeam] = await Promise.all([getRawProjects(), getRawTeamMembers()]);
  const activeMembersMap = new Map(rawTeam.map(m => [m.id, m]));

  const projects = rawProjects
    .filter(p => p.isPublished !== false)
    .map(p => {
      const mediaList: ProjectMedia[] = (p.media || []).map((m: any) => ({
        mediaType: (m.type || "IMAGE").toUpperCase(),
        url: m.url,
        altText: m.alt || null,
      }));

      const teamList = (p.teamMembers || [])
        .map((memberId: string) => {
          const member = activeMembersMap.get(memberId);
          if (!member) return null;
          return {
            teamMember: {
              id: member.id,
              name: member.name,
              slug: member.slug,
            },
          };
        })
        .filter(Boolean) as Array<{ teamMember: { id: string; name: string; slug: string } }>;

      return {
        id: p.id,
        title: p.title,
        slug: p.slug,
        description: p.description || "",
        category: p.category as ProjectCategory,
        workType: p.workType as ProjectWorkType,
        status: p.status || "completed",
        location: p.location || null,
        completedAt: p.completedAt || null,
        coverMediaUrl: p.coverImage || (mediaList[0]?.url) || null,
        isFeatured: !!p.isFeatured,
        isCoverProject: !!p.isCoverProject,
        isPublished: true,
        media: mediaList,
        teamMembers: teamList,
      };
    });

  // Sort: Featured first, then completedAt or default creation date
  return projects.sort((a, b) => {
    if (a.isCoverProject && !b.isCoverProject) return -1;
    if (!a.isCoverProject && b.isCoverProject) return 1;
    if (a.isFeatured && !b.isFeatured) return -1;
    if (!a.isFeatured && b.isFeatured) return 1;
    return (b.completedAt || "").localeCompare(a.completedAt || "");
  });
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const all = await getAllProjects();
  return all.filter(p => p.isFeatured).slice(0, 6);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const all = await getAllProjects();
  return all.find(p => p.slug === slug) || null;
}

export async function getAllTeamMembers(): Promise<TeamMemberWithProjects[]> {
  const [rawTeam, rawProjects] = await Promise.all([getRawTeamMembers(), getRawProjects()]);
  const activeMembers = rawTeam.filter(m => m.isActive !== false);

  return activeMembers.map(member => {
    const memberProjects = rawProjects
      .filter(p => p.isPublished !== false && (p.teamMembers || []).includes(member.id))
      .map(p => {
        const mediaList = (p.media || []).map((m: any) => ({
          mediaType: (m.type || "IMAGE").toUpperCase(),
          url: m.url,
          altText: m.alt || null,
        }));
        return {
          id: p.id,
          title: p.title,
          slug: p.slug,
          category: p.category as ProjectCategory,
          workType: p.workType as ProjectWorkType,
          coverMediaUrl: p.coverImage || (mediaList[0]?.url) || null,
          isFeatured: !!p.isFeatured,
        };
      });

    return {
      id: member.id,
      name: member.name,
      slug: member.slug,
      bio: member.bio || "",
      specialization: member.specialization || "",
      profileImageUrl: member.profileImage || null,
      instagramUrl: member.instagramUrl || null,
      isActive: true,
      projectMembers: memberProjects.map(proj => ({ project: proj })),
    };
  });
}

export async function getServices(): Promise<Service[]> {
  try {
    const servicesDir = path.join(contentDir, "services");
    const items = await fs.readdir(servicesDir);
    const services: Service[] = [];

    for (const item of items) {
      const stats = await fs.stat(path.join(servicesDir, item));
      if (stats.isDirectory()) {
        const data = await readJsonFile<any>(path.join(servicesDir, item, "index.json"));
        if (data) {
          services.push({
            id: item,
            name: data.name,
            slug: item,
            shortDescription: data.description ? data.description.slice(0, 120) + "..." : "",
            fullDescription: data.description || "",
            imageUrl: data.image || null,
          });
        }
      }
    }
    return services;
  } catch {
    return [];
  }
}