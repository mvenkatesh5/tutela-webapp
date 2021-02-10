export const profileSchemaData = [
  {
    tab_name: "Your Details",
    tab_key: "your_details",
    tab_data: [
      {
        kind_name: "Profile Details",
        kind_description:
          "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..",
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
        ],
      },
      {
        kind_name: "Personal Information",
        kind_description:
          "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..",
        kind_data: [
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
        kind_name: "Little more about yourself",
        kind_description:
          "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..",
        kind_data: [
          {
            key: "avid_reader",
            label: "1. Are you an avid reader?",
            required: true,
            data: [
              {
                key: "yes",
                value: "Yes, I love reading.",
              },
              {
                key: "no",
                value: "I don’t mind reading when required.",
              },
            ],
            kind: "radio",
            md: 12,
          },
          {
            key: "smart_deductions",
            label: "2 . Step by step working out of questions or smart deductions and shortcuts?",
            required: true,
            data: [
              {
                key: "yes",
                value: "I love attention to detail.",
              },
              {
                key: "no",
                value: "I enjoy solving in a smart way.",
              },
            ],
            kind: "radio",
            md: 12,
          },
          {
            key: "read_between_lines",
            label: "3 . Can you read between the lines?",
            required: true,
            data: [
              {
                key: "yes",
                value: "Yes, I love interpretation of the inner meaning.",
              },
              {
                key: "no",
                value: "I interpret literally what i see.",
              },
            ],
            kind: "radio",
            md: 12,
          },
          {
            key: "confortable_charts_diagram",
            label: "4 . Comfortable with charts and diagrams?",
            required: true,
            data: [
              {
                key: "yes",
                value: "Yes, I love it.",
              },
              {
                key: "no",
                value: "No, I don’t enjoy it very much. ",
              },
            ],
            kind: "radio",
            md: 12,
          },
          {
            key: "numbers_or_text",
            label: "5 . Love numbers or text?",
            required: true,
            data: [
              {
                key: "yes",
                value: "Yes, I love numbers and reading equally.",
              },
              {
                key: "no",
                value: "I don’t mind reading but i dont enjoy numbers.",
              },
            ],
            kind: "radio",
            md: 12,
          },
        ],
      },
    ],
  },
  {
    tab_name: "Parents Details",
    tab_key: "parent_details",
    tab_data: [
      {
        kind_name: "Mother’s Information",
        kind_description:
          "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..",
        kind_data: [
          {
            key: "mother_name",
            label: "Mother’s Name",
            required: true,
            data: [],
            kind: "text",
            md: 6,
          },
          {
            key: "mother_email",
            label: "Email",
            required: true,
            data: [],
            kind: "text",
            md: 6,
          },
          {
            key: "mother_phone",
            label: "Phone",
            required: true,
            data: [],
            kind: "text",
            md: 6,
          },
          {
            key: "mother_profession",
            label: "Profession",
            required: true,
            data: [],
            kind: "text",
            md: 6,
          },
          {
            key: "mother_organisation",
            label: "Organisation",
            required: true,
            data: [],
            kind: "text",
            md: 6,
          },
          {
            key: "mother_designation",
            label: "Designation",
            required: true,
            data: [],
            kind: "text",
            md: 6,
          },
          {
            key: "mother_mode_of_contact",
            label: "Preferred mode of contact",
            required: true,
            data: [
              {
                key: "call",
                value: "call",
              },
              {
                key: "text",
                value: "text",
              },
              {
                key: "email",
                value: "email",
              },
            ],
            kind: "checkbox",
            md: 6,
          },
        ],
      },
      {
        kind_name: "Father’s Information",
        kind_description:
          "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..",
        kind_data: [
          {
            key: "father_name",
            label: "Father’s Name",
            required: true,
            data: [],
            kind: "text",
            md: 6,
          },
          {
            key: "father_email",
            label: "Email",
            required: true,
            data: [],
            kind: "text",
            md: 6,
          },
          {
            key: "father_phone",
            label: "Phone",
            required: true,
            data: [],
            kind: "text",
            md: 6,
          },
          {
            key: "father_profession",
            label: "Profession",
            required: true,
            data: [],
            kind: "text",
            md: 6,
          },
          {
            key: "father_organisation",
            label: "Organisation",
            required: true,
            data: [],
            kind: "text",
            md: 6,
          },
          {
            key: "father_designation",
            label: "Designation",
            required: true,
            data: [],
            kind: "text",
            md: 6,
          },
          {
            key: "father_mode_of_contact",
            label: "Preferred mode of contact",
            required: true,
            data: [
              {
                key: "call",
                value: "call",
              },
              {
                key: "text",
                value: "text",
              },
              {
                key: "email",
                value: "email",
              },
            ],
            kind: "checkbox",
            md: 6,
          },
        ],
      },
    ],
  },
  {
    tab_name: "Educational Details",
    tab_key: "educational_details",
    tab_data: [
      {
        kind_name: "Acadamics",
        kind_description:
          "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..",
        kind_data: [
          {
            key: "school",
            label: "School",
            required: true,
            data: [],
            kind: "text",
            md: 12,
          },
          {
            key: "curriculum",
            label: "Curriculum",
            required: true,
            data: [],
            kind: "text",
            md: 6,
          },
          {
            key: "class",
            label: "Class",
            required: true,
            data: [],
            kind: "text",
            md: 6,
          },
        ],
      },
      {
        kind_name: "Aspirations after 12th",
        kind_description:
          "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..",
        kind_data: [
          {
            key: "dream_college",
            label: "Dream College",
            required: true,
            data: [],
            kind: "text",
            md: 12,
          },
          {
            key: "dream_course",
            label: "Dream Course",
            required: true,
            data: [],
            kind: "text",
            md: 12,
          },
        ],
      },
      {
        kind_name: "Extra Curriculars",
        kind_description:
          "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..",
        kind_data: [
          {
            key: "projects",
            label: "Projects",
            required: true,
            data: [],
            kind: "textarea",
            md: 12,
          },
          {
            key: "sports",
            label: "Sports",
            required: true,
            data: [],
            kind: "textarea",
            md: 6,
          },
          {
            key: "others",
            label: "Others",
            required: true,
            data: [],
            kind: "textarea",
            md: 6,
          },
        ],
      },
    ],
  },
];
