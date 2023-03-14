export enum EStatus {
  INITIAL = "initial",
  DONE = "done",
  BACKED = "backed",
}

export type TTodo = {
  name: string
  status: EStatus
  created_at: Date
  id: number
}
