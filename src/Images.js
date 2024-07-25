import React, { useEffect, useState } from "react"
import loader from './img/load.jpg'

const RANDOM_IMAGE_URL = 'https://api.thecatapi.com/v1/images/search';

export default function Images() {
  const load = new Array(3).fill(loader)
  const [imgSrc, setImgSrc] = useState(load)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getImageAndDraw()
  }, [])

  async function getImageAndDraw() {
    try {
      setIsLoading(true)
      const promises = []

      for (let i = 0; i < 3; i++) {
        promises.push(fetch(RANDOM_IMAGE_URL))
      }

      const response = await Promise.all(promises)
      const datas = await Promise.all(response.map(r => r.json()))
      const imgUrl = datas.map(data => data[0].url)

      let imgLoadingPromises = imgUrl.map(url => {
        return new Promise(res => {
          const img = new Image()
          img.src = url
          img.onload = () => res(url)
        })
      })

      await Promise.all(imgLoadingPromises)
      setImgSrc(imgUrl)
    } catch (error) {
      console.error('Error fetching the image:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClick = () => {
    setImgSrc(load)
    getImageAndDraw()
  }

  return (
    <div className="container" id="images">
      <div className="random-image left">
        <img className={isLoading ? 'load' : ''} src={imgSrc[0]} alt="" />
      </div>
      <div className="random-image right">
        <img className={isLoading ? 'load' : ''} src={imgSrc[1]} alt="" />
      </div>
      <div className="random-image left">
        <img className={isLoading ? 'load' : ''} src={imgSrc[2]} alt="" />
      </div>
      <div className="btn-pos">
        <div onClick={handleClick} className="random-image--button">
          Generate
        </div>
      </div>
    </div>
  )
}

// const randomImg = document.querySelectorAll('.random-image')
// const loading = document.querySelectorAll('.load')


// async function getImageAndDraw() {
//   try {
//     randomImg.forEach(el => {
//       el.innerHTML = ''
//       let load = document.createElement('img')
//       load.src = '../img/load.jpg'
//       load.classList.add('load')
//       el.append(load)
//     })

//     const fetchArr = []
//     for (let i = 0; i < 3; i++) {
//       fetchArr.push(fetch(RANDOM_IMAGE_URL))
//     }

//     let response = await Promise.all(fetchArr)
//     let data = await Promise.all(response.map(r => r.json()))
//     const allImages = []
//     data.forEach(d => {
//       let img = document.createElement('img')
//       img.src = d[0].url
//       allImages.push(img)
//     })

//     let imagesLoadPromises = allImages.map(image => {
//       return new Promise(res => {
//         image.onload = () => res(image)
//       })
//     })

//     await Promise.all(imagesLoadPromises)
//     randomImg.forEach((img, i) => {
//       img.innerHTML = ''
//       img.append(allImages[i])
//       loading.forEach(el => el.classList.remove('open'))
//     })

//   } catch (error) {
//     console.error('Error fetching the image:', error)
//   }

// }

// getImageAndDraw()
