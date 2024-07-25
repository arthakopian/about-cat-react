import React, { useEffect, useState } from "react";

const CAT_BREEDS = 'https://api.thecatapi.com/v1/breeds'

export default function Breed() {
  const [breeds, setBreeds] = useState([])
  const [currentBreed, setCurrentBreed] = useState(null)
  const [breedDetails, setBreedDetails] = useState(null);

  useEffect(() => {
    async function getCatBreeds() {
      try {
        const responses = await fetch(CAT_BREEDS)
        const data = await responses.json()
        setBreeds(data)
      } catch (error) {
        console.error('Error fetching the breeds:', error)
      }
    }

    getCatBreeds()
  }, [])

  useEffect(() => {
    const getCurrentCatBreed = async (current) => {
      const currentObj = breeds.find(breed => breed.name === current)
      if (!currentObj) return

      try {
        const response = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${currentObj.id}`);
        const data = await response.json();
        const source = data[0].url;

        setBreedDetails({
          name: currentObj.name,
          wikipedia_url: currentObj.wikipedia_url,
          origin: currentObj.origin,
          description: currentObj.description,
          imageUrl: source,
        });
      } catch (error) {
        console.error('Error fetching breed details:', error)
      }
    };

    if (currentBreed) {
      getCurrentCatBreed(currentBreed);
    }
    return setBreedDetails(null);
  }, [currentBreed, breeds]);

  const handleBreedClick = (e) => {
    const breedName = e.target.innerText
    setCurrentBreed(breedName);
  };

  return (
    <div className="content">
      <div className="container" id="breed">
        <div className="breed-nav">
          <ul onClick={handleBreedClick} className="breed-list custom-scroll">
            {breeds.map(breed => {
              return (<li className={breed.name === currentBreed ? 'active' : ''} key={breed.id}>{breed.name}</li>)
            })}
          </ul>
        </div>
        <div className="listing">
          <div className="listing-img">
            {breedDetails && (
              <>
                <img src={breedDetails.imageUrl} alt='' />
                <div className="listing-about">
                  <a target="_blank" rel="noopener noreferrer" href={breedDetails.wikipedia_url}>
                    {breedDetails.wikipedia_url}
                  </a>
                  <h1>{breedDetails.name}</h1>
                  <h2>{breedDetails.origin}</h2>
                </div>
              </>
            )}
          </div>
          <div className="listing-description">
            {breedDetails && breedDetails.description}
          </div>
        </div>
      </div>
    </div>
  )
}




// function setActiveListing(current) {
//   const allBreeds = document.querySelectorAll('.breed-list li')
//   allBreeds.forEach(breed => breed.classList.remove('active'))
//   current.classList.add('active')
// }



