import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from 'src/user/user.entity';
import { SearchTasksDto } from './dto/search-tasks.dto';

@Injectable()
export class TaskService {
    constructor(@InjectRepository(Task) private taskRepository: Repository<Task>){}

    async createTask (createTaskDto: CreateTaskDto,user: User): Promise<Task> {
        const {title, description} = createTaskDto
        const task = this.taskRepository.create({
            title,
            description,
            user
        })

        try {       

           await this.taskRepository.save(task)
           return task

        } catch(e) {
            throw new NotFoundException({
                message: ['Somthing wrong I can feel it']
            })
        }
    }
    
    async getTasks(user: User, searchTasksDto: SearchTasksDto): Promise<Task[]> {
        try {       
           const { search } = searchTasksDto
           const query = this.taskRepository.createQueryBuilder('task')
           query.where({ user })

           const tasks = await query.getMany()
           return tasks

         } catch(e) {
             throw new NotFoundException({
                 message: ['Task not found.']
             })
         }
    }

    async getTaskById(id: any,user: User): Promise<Task> {
        try {      

            const task = await this.taskRepository.findOne({where: {id,user}})
            return task

         } catch(e) {
             throw new NotFoundException({
                 message: ['Task not found.']
             })
         }
    }

    async updateTask(id: string, updateTaskDto: UpdateTaskDto,user: User){
        try{
            const task = await this.getTaskById(id,user)
            const {title,description} = updateTaskDto
            if(title) {
                task.title = title
            }
            if(description) {
                task.description = description
            }
            await this.taskRepository.save(task)
            return task

        } catch(e){
            throw new NotFoundException({
                message: ['Task not found.']
            })
        }
    }
    
    async deleteTask(id: string,user: User) {
        try {
          const task = await this.getTaskById(id,user)
          await this.taskRepository.delete(id)
          return task
        }catch(e) {
           throw new NotFoundException({
           message: ['Never gonna give you up.']
         })
        }
    }



}
