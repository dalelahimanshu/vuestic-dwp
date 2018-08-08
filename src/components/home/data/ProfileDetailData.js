export default {
  'rules': {
    'table': [
      {
        'profileId': '8124708b2212f006fb8d0bc247d0bc24',
        'severity': 1,
        'validationType': 'COUNT_BASED',
        'expectedCount': '500'
      },
      {
        'profileId': '8124708b2212f006fb8d0bc247d0bc24',
        'severity': 2,
        'validationType': 'DATE_BASED',
        'expectedCount': '23'
      }
    ],
    'column': [
      {
        'profileId': '8124708b2212f006fb8d0bc247d0bc24',
        'columnName': 'c0',
        'severity': 1,
        'regex': '([5-9]|10)',
        'message': '([5-9]|10)'
      },
      {
        'profileId': '8124708b2212f006fb8d0bc247d0bc24',
        'columnName': 'c2',
        'severity': 1,
        'regex': '([5-9]|10)',
        'message': '([5-9]|10)'
      },
      {
        'profileId': '8124708b2212f006fb8d0bc247d0bc24',
        'columnName': 'c2',
        'severity': 2,
        'regex': '([50-99]|100)',
        'message': '([5-9]|10)'
      },
      {
        'profileId': '8124708b2212f006fb8d0bc247d0bc24',
        'columnName': 'c4',
        'severity': 1,
        'regex': '([5-9]|10)',
        'message': '([5-9]|10)'
      },
      {
        'profileId': '8124708b2212f006fb8d0bc247d0bc24',
        'columnName': 'c6',
        'severity': 2,
        'regex': '([50-99]|100)',
        'message': '([5-9]|10)'
      }
    ]
  },
  'records': [
    {
      'c0': '0',
      'c1': '1',
      'c2': '2',
      'c3': '3',
      'c4': '4',
      'c5': '5',
      'c6': '6',
      'c7': '7',
      'c8': '8',
      'c9': '9'
    },
    {
      'c0': '00',
      'c1': '10',
      'c2': '20',
      'c3': '30',
      'c4': '40',
      'c5': '50',
      'c6': '60',
      'c7': '70',
      'c8': '80',
      'c9': '90'
    },
    {
      'c0': '000',
      'c1': '100',
      'c2': '200',
      'c3': '300',
      'c4': '400',
      'c5': '500',
      'c6': '600',
      'c7': '700',
      'c8': '800',
      'c9': '900'
    },
    {
      'c0': '0000',
      'c1': '1000',
      'c2': '2000',
      'c3': '3000',
      'c4': '4000',
      'c5': '5000',
      'c6': '6000',
      'c7': '7000',
      'c8': '8000',
      'c9': '9000'
    },
    {
      'c0': '00000',
      'c1': '10000',
      'c2': '20000',
      'c3': '30000',
      'c4': '40000',
      'c5': '50000',
      'c6': '60000',
      'c7': '70000',
      'c8': '80000',
      'c9': '90000'
    }
  ]
}
