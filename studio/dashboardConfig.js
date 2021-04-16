export default {
  widgets: [
    {
      name: 'project-info',
    },
    {
      name: 'project-users',
    },
    {
      name: 'cats',
    },
    {
      name: 'netlify',
      options: {
        title: 'My Netlify deploys',
        sites: [
          {
            title: 'Sanity Studio',
            apiId: '5a68c5c8-cca6-4bed-b677-c1a651cee45a',
            buildHookId: '604d1eaec49ff76c430e3e01',
            name: 'sanity-fedalei-touma-web',
          },
          {
            title: 'Frontend',
            apiId: '8e2849a6-4bfb-4530-addc-3022eafe39ee',
            buildHookId: '604d1f5353c698b84cefed6a',
            name: 'sanity-fedalei-touma-studio',
          },
        ],
      },
    },
  ],
}
