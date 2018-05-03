export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: ''
      }
    },
    {
      title: true,
      name: 'Operations',
      wrapper: {            
        element: '',        
        attributes: {}      
      },
      class: ''             
    },
    {
      name: 'Inventory',
      url: '/operation/inventory',
      icon: 'icon-layers',
    },
    {
      name: 'Actions',
      url: '/operation/playbook',
      icon: 'icon-control-play',
    },
    {
      name: 'Monitor',
      url: '/operation/monitor',
      icon: 'icon-graph',
    },
  ]
};
