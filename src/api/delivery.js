import axios from "axios"

export const getDeliverers = () =>
  axios
    .get("http://localhost:3000/api/delivery/deliverers", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
    .then((res) =>
      res.data.map((deliverer) => ({ ...deliverer, id: deliverer._id }))
    )

export const updateDeliverer = (id, { name, age, email }) =>
  axios.put(
    `http://localhost:3000/api/delivery/${id}`,
    { name, age, email },
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    }
  )

export const scheduleDelivery = (data) =>
  axios.post("http://localhost:3000/api/delivery/", data, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  })

export const getDeliveriesForDeliverer = (id) =>
  axios
    .get(`http://localhost:3000/api/delivery/deliverer/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
    .then((res) => res.data)
