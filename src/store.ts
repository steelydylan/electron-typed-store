import path from 'path'
import { app } from 'electron'

import { pathExists, readJson, writeJson } from './lib'

export class Store<T extends Record<string, string | number>> {
  private filePath: string
  private data: T
  private ready: Promise<void>

  constructor(fileName: string = 'store.json', defaultValues: T = {} as T) {
    this.filePath = path.join(app.getPath('userData'), fileName)
    this.data = {} as T
    this.ready = this.load(defaultValues)
  }

  private async load(values: T): Promise<void> {
    try {
      if (await pathExists(this.filePath)) {
        this.data = await readJson(this.filePath)
      }
      this.data = { ...values, ...this.data }
    } catch (error) {
      console.error('Failed to load data:', error)
    }
  }

  private async save(): Promise<void> {
    try {
      await writeJson(this.filePath, this.data)
    } catch (error) {
      console.error('Failed to save data:', error)
    }
  }

  public async set(key: keyof T, value: T[keyof T]): Promise<void> {
    await this.ready
    this.data[key] = value
    await this.save()
  }

  public async get(key: keyof T): Promise<T[keyof T]> {
    await this.ready
    return this.data[key]
  }

  public async delete(key: string): Promise<void> {
    await this.ready
    if (key in this.data) {
      delete this.data[key]
      await this.save()
    }
  }

  public async getAll(): Promise<T> {
    await this.ready
    return this.data
  }

  public async clear(): Promise<void> {
    await this.ready
    this.data = {} as T
    await this.save()
  }
}
