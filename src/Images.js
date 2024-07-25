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