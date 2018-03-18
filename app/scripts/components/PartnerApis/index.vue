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
        cols: [
          {
            label: 'Name',
            key: 'name'
          },
          {
            label: 'Related Organization',
            key: 'relatedOrganization'
          },
          {
            label: 'description',
            key: 'description'
          }
        ],
        apis: [
          {
            name: 'World Bank APIs',
            relatedOrganization: 'World Bank Group',
            orgUrl: 'http://www.worldbank.org',
            description: 'The World Bank Indicators API lets you programmatically access more than 8,000 indicators and query the data in several ways, using parameters to specify your request. Many data series date back 50 years, and can be used to create interesting applications.',
            link: 'https://data.worldbank.org/',
            docs: 'https://datahelpdesk.worldbank.org/knowledgebase/articles/889386-developer-information-overview',
            examples: '',
            github: ''
          },
          {
            name: 'GEODAB APIs',
            relatedOrganization: 'Group on Earth Observations',
            orgUrl: 'http://www.earthobservations.org',
            description: 'Serves metadata about available images and map layers. The API provides access to all imagery metadata information. The API provides endpoints for lists of images available, map layer services available, as well as simple analytics.',
            link: 'http://www.geodab.net/',
            docs: 'http://www.geodab.net/apis',
            examples: 'https://codepen.io/msantoro/pen/jZJXEO',
            github: 'https://github.com/hotosm/OpenAerialMap'
          },
          {
            name: 'Resource Watch API',
            relatedOrganization: 'World Resources Institute',
            orgUrl: 'http://www.wri.org/',
            description: 'Resource Watch, an open platform for everyone to explore accurate, up-to-date insights about our planet. ',
            link: 'http://resourcewatch.org/',
            docs: 'https://api.resourcewatch.org/',
            examples: '',
            github: 'https://github.com/resource-watch'
          },
          {
            name: 'United Nations Statistics Division SDG API',
            relatedOrganization: 'United Nations Statistics Division',
            orgUrl: 'https://unstats.un.org',
            description: 'Explore the official SDG data reported by the custodiam agencies.',
            link: 'https://unstats.un.org/home/',
            docs: 'https://unstats.un.org/SDGAPI/swagger/#/',
            examples: '',
            github: 'https://github.com/UNStats'
          },
          {
            name: 'OpenAerialMap meta API',
            relatedOrganization: 'HOT OSM',
            orgUrl: 'https://www.hotosm.org',
            description: 'Serves metadata about available images and map layers. The API provides access to all imagery metadata information. The API provides endpoints for lists of images available, map layer services available, as well as simple analytics.',
            link: 'https://openaerialmap.org/',
            docs: 'http://hotosm.github.io/oam-catalog/#api-Meta',
            examples: '',
            github: 'https://github.com/hotosm/OpenAerialMap'
          },
          {
            name: 'Radiant.Earth APIs',
            relatedOrganization: 'Radiant Earth',
            orgUrl: 'https://radiant.earth/',
            description: 'Radiant provides a geospatial and imagery technology platform that supports knowledge transfer to positively impact the developing worlds greatest social, economic and environmental challenges. The Raster Foundry API allows developers to find, view, and analyze geospatial data in Raster Foundry. As the name implies, its especially useful for working with large raster datasets like satellite imagery.',
            link: 'https://radiant.earth/',
            docs: 'https://doc.radiant.earth/',
            examples: '',
            github: 'https://github.com/radiantearth'
          },
          {
            name: 'Socioeconomic Data and Applications Center (SEDAC) Map Services',
            relatedOrganization: 'Center for International Earth Science Information Network (CIESIN)',
            orgUrl: 'http://ciesin.columbia.edu/',
            description: 'Focusing on human interactions in the environment, SEDAC has as its mission to develop and operate applications that support the integration of socioeconomic and earth science data and to serve as an "Information Gateway" between earth sciences and social sciences.',
            link: 'http://sedac.ciesin.columbia.edu/',
            docs: 'http://sedac.ciesin.columbia.edu/maps/services',
            examples: '',
            github: ''
          },
        ]
      };
    }
  };
</script>
