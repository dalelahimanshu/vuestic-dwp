export default {
  tableFields: [
    {
      name: '__component:profile-list-badge-column',
      title: '',
      dataClass: 'text-center'
    },
    {
      name: 'profileName',
      title: 'Name',
      dataClass: 'column-data-link',
      sortField: 'profileName'
    },
    {
      name: '__component:profile-list-category-column',
      title: 'Category',
      sortField: 'categoryName'
    },
    {
      name: '__component:profile-list-dryad-column',
      title: 'Dryad',
      titleClass: 'text-center',
      dataClass: 'text-center'
    }
  ],
  sortFunctions: {
    'profileName': function (item1, item2) {
      return item1 >= item2 ? 1 : -1
    },
    'categoryName': function (item1, item2) {
      return item1 >= item2 ? 1 : -1
    }
  }
}
