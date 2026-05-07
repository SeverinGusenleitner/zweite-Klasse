import { LinkedList, Time, Image, Node } from './linkedList';
import './styles.css';
// ---------------------------------------------------------------------------
// Set up the list with some initial songs so students see a non-empty state.
// ---------------------------------------------------------------------------
const list = new LinkedList<Image>();

// ---------------------------------------------------------------------------
// Get references to all DOM elements we need.
// ---------------------------------------------------------------------------
const galeryDiv = document.getElementById('galery') as HTMLDivElement;
const titleInput = document.getElementById('title-input') as HTMLInputElement;
const urlInput = document.getElementById('url-input') as HTMLInputElement;
const insertBtn = document.getElementById('insert-btn') as HTMLButtonElement;
const deleteSelect = document.getElementById('delete-select') as HTMLSelectElement;
const deleteBtn = document.getElementById('delete-btn') as HTMLButtonElement;
const errorMsg = document.getElementById('error-msg') as HTMLParagraphElement;

// ---------------------------------------------------------------------------
// render — rebuilds the visual list and refreshes both dropdowns.
// Called once on startup and after every insert/delete.
// ---------------------------------------------------------------------------
function render(): void {
  const images = list.toArray();

  galeryDiv.innerHTML = '';

  for (const i of images) {
    const titleSpan = document.createElement('span');
    titleSpan.textContent = `name: ${i.title}`;
    const image = document.createElement('img') as HTMLImageElement;
    image.src = i.imageUrl;
    image.style.width = '200px';
    image.style.height = '200px';
    const timeSpan = document.createElement('span') as HTMLSpanElement;
    timeSpan.textContent = `Created at: ${String(i.creationTime.hours).padStart(2, '0')}:${String(i.creationTime.minutes).padStart(2, '0')}`;
    const container = document.createElement('div') as HTMLDivElement;
    const upButton = document.createElement('button') as HTMLButtonElement;
    upButton.textContent = '+';
    const downButton = document.createElement('button') as HTMLButtonElement;
    downButton.textContent = '-';
    const buttoncontainer = document.createElement('div') as HTMLDivElement;
    buttoncontainer.appendChild(timeSpan);
    buttoncontainer.appendChild(upButton);
    buttoncontainer.appendChild(downButton);
    container.appendChild(titleSpan);
    container.appendChild(image);
    container.appendChild(buttoncontainer);
    container.className = 'imageEl';
    galeryDiv.appendChild(container);

    upButton.addEventListener('click', () => {
      i.creationTime.hours += 1;
      list.delete(i.title);
      const node = new Node<Image>({ title: i.title, imageUrl: i.imageUrl, creationTime: i.creationTime });
      list.insertBefore(node);
      render();
    });
    downButton.addEventListener('click', () => {
      i.creationTime.hours -= 1;
      list.delete(i.title);
      const node = new Node<Image>({ title: i.title, imageUrl: i.imageUrl, creationTime: i.creationTime });
      list.insertBefore(node);
      render();
    });
  }

  // Refresh the "delete" dropdown.
  deleteSelect.innerHTML = '';
  for (const i of images) {
    const option = document.createElement('option');
    option.value = i.title;
    option.textContent = `${i.title} – ${i.creationTime}`;
    deleteSelect.appendChild(option);
  }

  // Disable delete button when the list is empty.
  deleteBtn.disabled = images.length === 0;
}

// ---------------------------------------------------------------------------
// showError — displays a temporary error message to the user.
// ---------------------------------------------------------------------------
function showError(message: string): void {
  errorMsg.textContent = message;
  errorMsg.style.display = 'block';
  setTimeout(() => {
    errorMsg.style.display = 'none';
  }, 3000);
}
// ---------------------------------------------------------------------------
// Insert button handler.
// ---------------------------------------------------------------------------
insertBtn.addEventListener('click', () => {
  const title = titleInput.value.trim();
  const url = urlInput.value.trim();
  if (title === '' || url === '') {
    showError('Please enter a title, a url and a time');
    return;
  }
  const date = new Date();

  const time: Time = {
    hours: date.getHours(),
    minutes: date.getMinutes(),
  };
  const node = new Node<Image>({ title: title, imageUrl: url, creationTime: time });
  list.insertBefore(node);
  titleInput.value = '';
  urlInput.value = '';
  render();
});

// ---------------------------------------------------------------------------
// Delete button handler.
// ---------------------------------------------------------------------------
deleteBtn.addEventListener('click', () => {
  const title = deleteSelect.value;
  list.delete(title);
  render();
});

// ---------------------------------------------------------------------------
// Initial render.
// ---------------------------------------------------------------------------
render();
