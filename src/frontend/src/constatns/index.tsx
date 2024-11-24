import { ProductsType, ReceiptInfoType, ReceiptProps, TemplatesProps } from '../types'

export const templates:TemplatesProps[] = [
  {
    id:'543084',
    name: 'Dohoda o brigade',
    images: '',
    new_users: 2
    
  },
  {
    id:'543085',
    name: 'Dohoda o brigade',
    images: '',
    new_users: 1
    
  },
  {
    id:'543086',
    name: 'Dohoda o brigade',
    images: '',
    new_users: 0
    
  },
  {
    id:'543087',
    name: 'Dohoda o brigade',
    images: '',
    new_users: 0
    
  },
  




  {
    id:'543088',
    name: 'Dohoda o brigade',
    images: '',
    new_users: 0
    
  },
  {
    id:'543089',
    name: 'Dohoda o brigade',
    images: '',
    new_users: 0
    
  },
  {
    id:'543090',
    name: 'Dohoda o brigade',
    images: '',
    new_users: 0
    
  },
  {
    id:'543091',
    name: 'Dohoda o brigade',
    images: '',
    new_users: 0
    
  },
  {
    id:'543092',
    name: 'Dohoda o brigade',
    images: '',
    new_users: 0
    
  },
  {
    id:'543093',
    name: 'Dohoda o brigade',
    images: '',
    new_users: 0
    
  },
  {
    id:'543094',
    name: 'Dohoda o brigade',
    images: '',
    new_users: 0
    
  },
]

export const receipts: ReceiptProps[] = [
  {
    id: '1',
    price: '2,97',
    organization_name: 'BILLA s.r.o.',
    date: '2.4.2022 15:09',
    municipality: 'Bratislava - mestská časť Ružinov'
  },
  {
    id: '2',
    price: '100',
    organization_name: 'Kaufland Slovenská republika v.o.s.',
    date: '5.3.2022 13:56',
    municipality: 'Bratislava - mestská časť Ružinov'

  },
  {
    id: '3',
    price: '100',
    organization_name: 'Lidl Slovenská republika, s.r.o.',
    date: '5.3.2022 14:36',
    municipality: 'Bešeňová'
  }
  
]

export const receiptInfo: ReceiptInfoType[] = [{
  productId: '1',
  eco_score: 80,
  carbon_footprint: 100,
  work_rate: 3,
  local_organization: true,
  category: 'Stravovanie'
},
{
  productId: '2',
  eco_score: 40,
  carbon_footprint: 12,
  work_rate: 4,
  local_organization: false,
  category: 'Stravovanie'

},
{
  productId: '3',
  eco_score: 60,
  carbon_footprint: 80,
  work_rate: 2,
  local_organization: true,
  category: 'Zdravie a osobná starostlivosť'
}
]
