import React, { useState } from 'react'
import { NewWidget, Widget } from '../../models/Widget'
import { addWidget, getWidgets } from '../apiClient'

interface Props {
  setWidgets: React.Dispatch<React.SetStateAction<Widget[]>>
  widgets: Widget[]
  fetchWidgets: () => void
  setFormShow:React.Dispatch<React.SetStateAction<boolean>>
  formShow:boolean
}

const emptyForm = {
  name: '',
  price: 0,
  mfg: '',
  inStock: 0,
}

const AddWidget = ({ setWidgets, widgets, fetchWidgets, setFormShow,formShow }: Props) => {
  const [form, setForm] = useState<NewWidget>(emptyForm)

  function hanldeChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setForm({ ...form, [name]: value })
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const newWidget = await addWidget(form)

    setWidgets([...widgets, newWidget])
    setForm(emptyForm)
    fetchWidgets()
    setFormShow(!formShow)
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

export default AddWidget
