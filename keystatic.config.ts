import { config, fields, collection, singleton } from "@keystatic/core";

export default config({
  storage: {
    kind: "local",
  },
  collections: {
    projects: collection({
      label: "Projects",
      slugField: "title",
      path: "content/projects/*/",
      format: { data: "json" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({ label: "Description", multiline: true }),
        category: fields.select({
          label: "Category",
          options: [
            { label: "Mural", value: "MURAL" },
            { label: "Interior", value: "INTERIOR" },
            { label: "Commercial", value: "COMMERCIAL" },
            { label: "Custom", value: "CUSTOM" },
          ],
          defaultValue: "MURAL",
        }),
        workType: fields.select({
          label: "Work Type",
          options: [
            { label: "Solo", value: "SOLO" },
            { label: "Collaborative", value: "COLLABORATIVE" },
          ],
          defaultValue: "SOLO",
        }),
        status: fields.select({
          label: "Status",
          options: [
            { label: "Upcoming", value: "upcoming" },
            { label: "In Progress", value: "in-progress" },
            { label: "Completed", value: "completed" },
          ],
          defaultValue: "completed",
        }),
        location: fields.text({ label: "Location" }),
        completedAt: fields.text({ label: "Completed Date (YYYY-MM-DD)" }),
        coverImage: fields.text({ label: "Cover Image URL (Cloudinary or public folder)" }),
        isFeatured: fields.checkbox({ label: "Is Featured", defaultValue: false }),
        isPublished: fields.checkbox({ label: "Is Published", defaultValue: true }),
        media: fields.array(
          fields.object({
            type: fields.select({
              label: "Type",
              options: [
                { label: "Image", value: "image" },
                { label: "YouTube Video", value: "youtube" },
                { label: 'Instagram Post', value: 'instagram' },
                { label: 'Instagram Reel', value: 'instagram-reel' },
                { label: 'Instagram Gallery / Carousel', value: 'instagram-gallery' },
              ],
              defaultValue: "image",
            }),
            url: fields.text({ label: "URL" }),
            alt: fields.text({ label: "Alt text / Caption" }),
          }),
          {
            label: "Media Gallery",
            itemLabel: (props) =>
              `${props.fields.type.value}: ${props.fields.alt.value || props.fields.url.value || ""}`,
          }
        ),
        teamMembers: fields.array(
          fields.relationship({
            label: "Team Member",
            collection: "team",
          }),
          {
            label: "Team Members",
            itemLabel: (props) => props.value || "",
          }
        ),
      },
    }),
    team: collection({
      label: "Team Members",
      slugField: "name",
      path: "content/team/*/",
      format: { data: "json" },
      schema: {
        name: fields.slug({ name: { label: "Name" } }),
        bio: fields.text({ label: "Bio", multiline: true }),
        specialization: fields.text({ label: "Specialization" }),
        profileImage: fields.text({ label: "Profile Image URL" }),
        instagramUrl: fields.text({ label: "Instagram URL" }),
        isActive: fields.checkbox({ label: "Is Active", defaultValue: true }),
      },
    }),
    services: collection({
      label: "Services",
      slugField: "name",
      path: "content/services/*/",
      format: { data: "json" },
      schema: {
        name: fields.slug({ name: { label: "Service Name" } }),
        description: fields.text({ label: "Description", multiline: true }),
        image: fields.text({ label: "Image URL" }),
      },
    }),
  },
  singletons: {
    brand: singleton({
      label: "Brand Settings",
      path: "content/brand/",
      format: { data: "json" },
      schema: {
        brandName: fields.text({ label: "Brand Name" }),
        tagline: fields.text({ label: "Tagline" }),
        email: fields.text({ label: "Email" }),
        instagram: fields.text({ label: "Instagram Profile Link" }),
        whatsapp: fields.text({ label: "WhatsApp Link" }),
        commonGallery: fields.array(
          fields.object({
            type: fields.select({
              label: "Type",
              options: [
                { label: "Image", value: "image" },
                { label: "YouTube Video", value: "youtube" },
                { label: "Instagram Post", value: "instagram" },
                { label: "Instagram Reel", value: "instagram-reel" },
                { label: "Instagram Gallery / Carousel", value: "instagram-gallery" },
              ],
              defaultValue: "image",
            }),
            url: fields.text({ label: "URL" }),
            alt: fields.text({ label: "Alt text / Caption" }),
          }),
          {
            label: "Common Gallery (Home Page)",
            itemLabel: (props) =>
              `${props.fields.type.value}: ${props.fields.alt.value || props.fields.url.value || ""}`,
          }
        ),
      },
    }),
  },
});
