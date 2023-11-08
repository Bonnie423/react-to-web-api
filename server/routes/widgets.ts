import express from 'express'
import { addWidgets, getWidgets, editWidget, deleteWidget } from '../db/db.ts'

const router = express.Router()

router.get('/', (req, res) => {
  getWidgets()
    .then((widgets) => {
      res.json(widgets)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

router.post('/', async (req, res) => {
  try {
    const { name, price, mfg, inStock } = req.body
    const newWidget = { name, price, mfg, inStock }
    const newWidgets = await addWidgets(newWidget)

    res.json(newWidgets)
  } catch (err) {
    console.error(err)
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const { name, price, mfg, inStock } = req.body
    const newWidget = { name, price, mfg, inStock }
    const updatedWidget = await editWidget(id, newWidget)

    res.json(updatedWidget)
  } catch (err) {
    console.error(err)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const widgets = await deleteWidget(id)

    res.json(widgets)
  } catch (err) {
    console.error(err)
  }
})

export default router
