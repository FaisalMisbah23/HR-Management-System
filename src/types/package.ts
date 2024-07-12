export type Package =  {
  name: string,
  duration: number,
  startDate: string,
  endDate: string,
  type:string,
  reason:string
}

export type Leave =  {
  name: string,
  duration: number,
  recall: boolean
}

export type Employee =  {
  name: string,
  dept: string,
  jobTitle:string,
  startDate: string,
  category:string,
  gender:string,
}

export type Target =  {
  name: string,
  title: string,
  kpiWeight:number,
  startDate: string,
  endDate:string,
}
