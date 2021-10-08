const { v4: uuidv4 } = require('uuid');
const express = require('express')
const cors = require('cors')


const app = express()
app.use(express.json())
app.use(cors())

app.use(express.static('www'))


const port = 3000

const notes =[]

app.get('/notes', (req, res) => {
  res.json(notes)
})

app.get('/notes/:id', (req, res) => {
  const id = req.params.id

  if(!id){ 
    return res.status(400).json({ message: "informe o campo id !"})
  }
  const note = notes.find((n) => n.id === id)

  if(!note){ 
    return res.status(400).json({ message: "Nenhuma anotação encontrada para ID informado !"})
  }

  res.json(note)
})


app.post('/notes', (req, res) => {
  const title = req.body.title
  const description = req.body.description

  if(!title){ 
    return res.status(400).json({ message: "informe o campo título !"})
  }
  if(!description){ 
    return res.status(400).json({ message: "informe o campo descrição  !"})
  }

  notes.push({
    id: uuidv4(),
    title,
    description
  })

  res.json({message:'Anotação salva com sucesso !'})
})
app.put('/notes', (req, res) => {
  const id = req.body.id
  const title = req.body.title
  const description = req.body.description

  if(!id){ 
    return res.status(400).json({ message: "informe o campo id !"})
  }
  const note = notes.find((n) => n.id === id)

  if(!note){ 
    return res.status(400).json({ message: "Nenhuma anotação encontrada para ID informado !"})
  }

  if(!title){ 
    return res.status(400).json({ message: "informe o campo título !"})
  }
  if(!description){ 
    return res.status(400).json({ message: "informe o campo descrição  !"})
  }

  for(const noteObject of notes){
    if(noteObject.id === id){
      noteObject.title = title
      noteObject.description = description
    }
  }

  res.json({message:'Anotação alterada com sucesso !'})
})

app.delete('/notes', (req, res) => {
  const id = req.body.id
  

  if(!id){ 
    return res.status(400).json({ message: "informe o campo id !"})
  }
  const note = notes.find((n) => n.id === id)

  if(!note){ 
    return res.status(400).json({ message: "Nenhuma anotação encontrada para ID informado !"})
  }


  for(const index in notes){
    if(notes[index].id === id){
      notes.splice(index, 1)
    }
  }

  res.json({message:'Anotação excluída com sucesso !'})
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
