export const teacherSchema = [
  {
    tab_name: "Profile Details",
    tab_key: "profile_details",
    tab_data: [
      {
        kind_name: "Profile Details",
        kind_description:
          "Please fill in your basic details to ensure you don't miss out on any important information from Tutela's end",
        kind_data: [
          {
            key: "image",
            label: "Image",
            required: true,
            data: [],
            kind: "file",
            md: 12,
          },
          {
            key: "name",
            label: "Name",
            required: true,
            data: [],
            kind: "text",
            md: 6,
          },
          {
            key: "email",
            label: "Email",
            required: true,
            data: [],
            kind: "text",
            md: 6,
          },
          {
            key: "phone",
            label: "Phone",
            required: true,
            data: [],
            kind: "text",
            md: 6,
          },
          {
            key: "dob",
            label: "Date of Birth",
            required: true,
            data: [],
            kind: "date",
            md: 6,
          },
          {
            key: "country",
            label: "Country",
            required: true,
            data: [],
            kind: "select",
            md: 6,
          },
          {
            key: "state",
            label: "State",
            required: true,
            data: [],
            kind: "select",
            md: 6,
          },
          {
            key: "address",
            label: "Address",
            required: true,
            data: [],
            kind: "textarea",
            md: 12,
          },
        ],
      },
      {
        kind_name: "Educational Details",
        kind_description:
          "Please help us understand your interests and aptitude. Try to answer these as honestly and instinctively as possible!",
        kind_data: [
          {
            key: "Educational-details",
            label: "Enter here",
            required: true,
            data: [],
            kind: "textarea",
            md: 12,
          },
        ],
      },
      {
        kind_name: "Experience Details",
        kind_description:
          "Please help us understand your interests and aptitude. Try to answer these as honestly and instinctively as possible!",
        kind_data: [
          {
            key: "Experience-details",
            label: "Enter here",
            required: true,
            data: [],
            kind: "textarea",
            md: 12,
          },
        ],
      },
      {
        kind_name: "Skills and Achievements",
        kind_description:
          "Please help us understand your interests and aptitude. Try to answer these as honestly and instinctively as possible!",
        kind_data: [
          {
            key: "skills-Achievements",
            label: "Enter here",
            required: true,
            data: [],
            kind: "textarea",
            md: 12,
          },
        ],
      },
    ],
  },
];
