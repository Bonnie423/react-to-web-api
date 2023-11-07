/* eslint-disable @typescript-eslint/no-unused-vars */
import request from 'superagent'

const widgetUrl = '/api/v1/widgets/'

import { Widget, NewWidget } from '../models/Widget'

export async function getWidgets(): Promise<Widget[]> {
  const widges = await request.get(widgetUrl)

  return widges.body
}

export async function addWidget(widget: NewWidget) {
  const newWidget = await request.post(widgetUrl).send(widget)

  return newWidget.body
}

export async function editWidget(id :number ,widget: NewWidget ){
  const newWidget = await request.patch(`${widgetUrl}/${id}`).send(widget)
  return newWidget.body
}

export async function deleteWidget(id:number) {
  const newWidget = await request.delete(`${widgetUrl}/${id}`)
  return newWidget.body
}
