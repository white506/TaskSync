import { axiosWithAuth } from "@/api/interseptors"
import { ITaskResponse, TypeTaskFormState } from "@/types/task.types"

class TaskService {
  private BASE_URL = '/user/tasks'

  async getTasks() {
    const responce = await axiosWithAuth.get<ITaskResponse[]>(this.BASE_URL)
    return responce
  }

  async createTask(data: TypeTaskFormState) {
    const response = await axiosWithAuth.post(this.BASE_URL, data)
    return response
  }

  async updateTask(id: string, data: TypeTaskFormState) {
    const responce = await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data)
    return responce
  }

  async deleteTask(id: string) {
    const responce = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
    return responce
  }
}

export const taskService = new TaskService()