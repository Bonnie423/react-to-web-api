import React, { useState } from 'react'
import { NewWidget, Widget } from '../../models/Widget'
import AddWidget from './AddWidget'
import { editWidget } from '../apiClient'

interface Props {
  widget: NewWidget
  widgetId: number
  setWidgets: React.Dispatch<React.SetStateAction<Widget[]>>
  fetchWidgets: ()=>void,
  setEditId:React.Dispatch<React.SetStateAction<number | null>>
}

const emptyForm = {
  name: '',
  price: 0,
  mfg: '',
  inStock: 0,
}

const EidtForm = ({ widget, widgetId, fetchWidgets, setEditId }: Props) => {
  const [form, setForm] = useState<NewWidget>(widget)

  function hanldeChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setForm({ ...form, [name]: value })
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault()
     await editWidget(widgetId, form)
     
      fetchWidgets()
      setForm(emptyForm)
      setEditId(null)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={hanldeChange}
        />
        <label htmlFor="price">Price</label>
        <input
          type="text"
          id="price"
          name="price"
          value={form.price}
          onChange={hanldeChange}
        />
        <label htmlFor="mfg">Manufacturer</label>
        <input
          type="text"
          id="mfg"
          name="mfg"
          value={form.mfg}
          onChange={hanldeChange}
        />
        <label htmlFor="inStock">In Stock</label>
        <input
          type="text"
          id="inStock"
          name="inStock"
          value={form.inStock}
          onChange={hanldeChange}
        />

        <button>Submit</button>
      </form>
    </div>
  )
}

export default EidtForm
