export function generateItemDetailTemplate({
  id,
  name,
  description,
  photoUrl,
  createdAt,
  lat,
  lon,
}) {
  return `
      <div class="item-detail" data-id="${id}">
        <img src="${photoUrl}" alt="${name}" class="item-image">
        <div class="item-content">
          <h3 class="item-title">${name}</h3>
          <p class="item-description">${description || 'No description available.'}</p>
          <p class="item-date"><small>Created at: ${new Date(createdAt).toLocaleString()}</small></p>
          ${
            lat && lon
              ? `<p class="item-location">Location: Latitude: ${lat}, Longitude: ${lon}</p>`
              : ''
          }
        </div>
      </div>
    `;
}

export function showFormattedDate(date, locale = 'en-US', options = {}) {
  return new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  });
}

export function generateItemTemplate({ id, name, description, photoUrl, createdAt, lat, lon }) {
  return `
      <div class="item" data-id="${id}">
        <img src="${photoUrl}" alt="${name}" class="item-image">
        <div class="item-content">
          <h3 class="item-title">${name}</h3>
          <p class="item-description">${description || 'No description available.'}</p>
          <p class="item-date"><small>Created at: ${new Date(createdAt).toLocaleString()}</small></p>
          ${
            lat !== undefined && lon !== undefined
              ? `<p class="item-location">Location: Latitude: ${lat}, Longitude: ${lon}</p>`
              : ''
          }
        </div>
      </div>
    `;
}

//fungsi untuk grid get stories
export function generateItemStories({ photoUrl, name, description, createdAt, id, lat, lon }) {
  return `

<div  class="story-item" >
<img src="${photoUrl}" alt="${name}"   >

<h3 >${name}</h3>
<p>${description}</p>
<p>${lat && lon ? `${lat}, ${lon}` : 'No location available'}</p>
<p> <small>${new Date(createdAt).toLocaleString()}</small> </p>
<button class="detail-button" data-id="${id}" >Detail</button>
</div>


`;
}
