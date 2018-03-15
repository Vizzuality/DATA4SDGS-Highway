<template src="./template.html"></template>
<style lang="scss" src="./style.scss"></style>

<script>
  import TableComponent from 'components/Table';

  export default {
    name: 'partner-apis-component',
    components: {
      TableComponent
    },
    data() {
      return {
        cols: ['name', 'relatedOrganization', 'description'],
        apis: [
          {
            name: 'OpenAerialMap meta API',
            relatedOrganization: 'HOT OSM',
            description: 'Serves metadata about available images and map layers. The API provides access to all imagery metadata information. The API provides endpoints for lists of images available, map layer services available, as well as simple analytics.',
            link: 'https://openaerialmap.org/',
            docs: 'http://hotosm.github.io/oam-catalog/#api-Meta',
            github: ''
          },
          {
            name: 'OpenAerialMap meta API',
            relatedOrganization: 'HOT OSM',
            description: 'Serves metadata about available images and map layers. The API provides access to all imagery metadata information. The API provides endpoints for lists of images available, map layer services available, as well as simple analytics.',
            link: 'https://openaerialmap.org/',
            docs: 'http://hotosm.github.io/oam-catalog/#api-Meta',
            github: ''
          }
        ]
      };
    }
  };
</script>
