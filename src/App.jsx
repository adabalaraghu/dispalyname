import { useState } from 'react'
import './App.css'

function App() {
  const [ename, setEname] = useState('')
  const [data, setData] = useState([])
  const [showData, setShowData] = useState(false)

  const handleAddData = async () => {
    if (!ename) return alert('Please enter a name')

    try {
      const response = await fetch('http://localhost:3001/add-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ename }),
      })
      const result = await response.json()
      if (response.ok) {
        alert(result.message)
        setEname('')
        // Refresh data if view is open
        if (showData) handleViewData()
      } else {
        alert('Error adding data: ' + result.error)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to connect to server. Make sure node backend/server.js is running.')
    }
  }

  const handleViewData = async () => {
    try {
      const response = await fetch('http://localhost:3001/view-data')
      const result = await response.json()
      if (response.ok) {
        setData(result)
        setShowData(true)
      } else {
        alert('Error fetching data: ' + result.error)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to connect to server. Make sure node backend/server.js is running.')
    }
  }

  const handleClose = () => {
    setShowData(false)
    setData([])
    setEname('')
  }

  return (
    <div className="container">
      <h1>First Page</h1>
      <div className="form-group">
        <label>Name (ename): </label>
        <input
          type="text"
          value={ename}
          onChange={(e) => setEname(e.target.value)}
          placeholder="Enter name"
        />
      </div>
      <div className="button-group" style={{ marginTop: '20px' }}>
        <button onClick={handleAddData} style={{ marginRight: '10px' }}>1. Add Data</button>
        <button onClick={handleViewData} style={{ marginRight: '10px' }}>2. View Data</button>
        <button onClick={handleClose}>3. Close</button>
      </div>

      {showData && (
        <div className="data-view" style={{ marginTop: '20px' }}>
          <h3>Data from Database:</h3>
          <ul>
            {data.map((item, index) => (
              <li key={index}>{JSON.stringify(item)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default App