export interface Project {
  id: string
  name: string
  description?: string
  startDate: string
  endDate: string
  creatorId: string
  collaborators: string[]
}


export interface CreateProjectBody {
  name: string
  description?: string
  startDate: string
  endDate: string
}

export interface CreateProjectInput extends CreateProjectBody {
  creatorId: string
}

export interface UpdateProjectInput {
  name?: string
  description?: string
  start_date?: string
  end_date?: string
}

