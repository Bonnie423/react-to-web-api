import connection from './connection.ts'

import { NewWidget, Widget } from '../../models/Widget.ts'
const db = connection

export function getWidgets(): Promise<Widget[]> {
  return db<Widget>('widgets').select()
}

export function addWidgets(newWidget: NewWidget): Promise<Widget[]> {
  return db<Widget>('Widgets').insert(newWidget).returning('*')
}

export function editWidget(id: number, newWidget: NewWidget) {
  return db('Widgets').where('id', id).update(newWidget)
}

export function deleteWidget(id: number) {
  return db('Widgets')
    .where('id', id)
    .del()

}
