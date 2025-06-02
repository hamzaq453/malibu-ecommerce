import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'categoryType',
      title: 'Category Type',
      type: 'string',
      options: {
        list: [
          { title: 'Main Category', value: 'main' },
          { title: 'Sub Category', value: 'sub' }
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'parent',
      title: 'Parent Category',
      type: 'reference',
      to: [{ type: 'category' }],
      description: 'Select parent category if this is a subcategory',
      hidden: ({ document }) => document?.categoryType === 'main',
    }),
    defineField({
      name: 'image',
      title: 'Category Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which the category should appear (lower numbers appear first)',
      validation: (Rule) => Rule.required().integer().min(0),
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Whether this category should be shown on the site',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'categoryType',
      media: 'image',
      parent: 'parent.name'
    },
    prepare({ title, subtitle, media, parent }) {
      return {
        title,
        subtitle: parent ? `${subtitle} of ${parent}` : subtitle,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrderAsc',
      by: [
        { field: 'displayOrder', direction: 'asc' }
      ]
    }
  ]
}) 