import { useEffect, useState } from 'react'
import * as Models from '../../models/Widget'
import { deleteWidget, getWidgets } from '../apiClient'
import AddWidget from './AddWidget'
import EidtForm from './EidtForm'
import { addWidgets } from '../../server/db/db'

function App() {
  const initialWidgets: Models.Widget[] = []
  const [widgets, setWidgets] = useState(initialWidgets)
  const [formShow, setFormShow] = useState(false)
  const [editWidgetId, setEditWidgetId] = useState<number | null>(null)

  useEffect(() => {
    try {
      fetchWidgets()
    } catch (err) {
      console.log(err)
    }
  }, [])

  async function fetchWidgets() {
    try {
      const widgetsData = await getWidgets()

      setWidgets(widgetsData)
    } catch (err) {
      console.error(err)
    }
  }

  function handleEditWidgetId(widgetId: number | null) {
    setEditWidgetId(widgetId)
  }

  async function handleDeleteWidget(widgetId: number) {
    try {
      await deleteWidget(widgetId)
      //setWidgets(widgets)
      fetchWidgets()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <h2>Widgets for the win</h2>
      <ul>
        {widgets ? (
          widgets.map((widget, index) => {
            return (
              <li key={index}>
                <h3>{widget.name}</h3>
                <p>Price: {widget.price}</p>
                <p>Mfg: {widget.mfg}</p>
                <p>In-Stock: {widget.inStock}</p>
                {editWidgetId === widget.id && (
                  <EidtForm
                    widget={widget}
                    widgetId={widget.id}
                    setWidgets={setWidgets}
                    fetchWidgets={fetchWidgets}
                  />
                )}
                <button onClick={() => handleEditWidgetId(widget.id)}>
                  Edit
                </button>
                <button onClick={() => handleDeleteWidget(widget.id)}>
                  Delete
                </button>
              </li>
            )
          })
        ) : (
          <p>Something is wrong here!</p>
        )}
      </ul>
      <button onClick={() => setFormShow(!formShow)}>Add Widget</button>
      {formShow && <AddWidget setWidgets={setWidgets} widgets={widgets} fetchWidgets={fetchWidgets} />}
    </div>
  )
}

export default App
