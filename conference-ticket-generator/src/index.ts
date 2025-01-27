import './styles/style.scss';

const submitForm = document.querySelector('input[type="submit"]') as HTMLInputElement;

let fileUrl: string | null = null;

const fileInput = document.querySelector('#file-load') as HTMLInputElement;
const hintText = document.querySelector('.hint-text') as HTMLSpanElement;
const hint = document.querySelector('.hint') as HTMLParagraphElement;

const uploadIcon = document.querySelector('.upload-icon') as HTMLImageElement;
const instructionText = document.querySelector('.instruction-text') as HTMLParagraphElement;

const imgControlsBtns = document.querySelector('.img-controls-btns') as HTMLDivElement;
const uploadImg = document.querySelector('.upload-img') as HTMLImageElement;

const removeImgBtn = document.querySelector('.remove-img') as HTMLButtonElement;

const changeImgBtn = document.querySelector('.change-img') as HTMLButtonElement;

const field = document.querySelector('.field') as HTMLDivElement;

const active = (): void => field?.classList.add('hover');
const inactive = (): void => field?.classList.remove('hover');

const obj: Record<string, string> = {};

const uploadFile = (file: File) => {
  if (file.size > 500 * 1024) {
    hint.classList.add('warning');
    hintText.textContent = 'File too large. Please upload a photo under 500KB.';
    return;
  }

  hint.classList.remove('warning');
  hintText.textContent = 'Upload your photo (JPG or PNG, max size: 500KB).';

  uploadIcon.classList.add('hidden');
  instructionText.classList.add('hidden');

  imgControlsBtns.classList.remove('hidden');
  uploadImg.classList.remove('hidden');

  fileUrl = URL.createObjectURL(file);
  obj.url = fileUrl;
  uploadImg.src = fileUrl;
}

const prevents = (e: Event): void => e.preventDefault();

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eName => {
  field.addEventListener(eName, prevents);
});

['dragenter', 'dragover'].forEach(evtName => {
  field.addEventListener(evtName, active);
});

['dragleave', 'drop'].forEach(evtName => {
  field.addEventListener(evtName, inactive);
});

field.addEventListener('drop', (e):void => {
  const file = e.dataTransfer?.files[0];
  const acceptedTypes = ["image/png", "image/jpeg", "image/jpg"];
  if (file && acceptedTypes.includes(file.type)) {
    uploadFile(file);
  }
});

fileInput.addEventListener('change', (): void => {

  const file = fileInput.files?.[0]; 

  if (!file) {
    return;
  }

  uploadFile(file)

});

removeImgBtn.addEventListener('click', (event): void => {
  event.preventDefault();

  uploadIcon.classList.remove('hidden');
  instructionText.classList.remove('hidden');

  imgControlsBtns.classList.add('hidden');
  uploadImg.classList.add('hidden');

  uploadImg.src = '';
});

changeImgBtn.addEventListener('click', (event): void => {
  event.preventDefault();
  fileInput.click();
});

const nameInput = document.querySelector('#fullname') as HTMLInputElement;
const emailInput = document.querySelector('#email-input') as HTMLInputElement;
const githubInput = document.querySelector('#github-input') as HTMLInputElement;

const inputsArr: HTMLInputElement[] = [nameInput, emailInput, githubInput];

const check = (element: HTMLInputElement):void => {
  if (element.value.length < 3) {
    element.classList.add('invalid');
    element.nextElementSibling?.classList.add('warning');
  } else {
    element.classList.remove('invalid');
    element.nextElementSibling?.classList.remove('warning');
  }
}

inputsArr.forEach(element => {
  element.addEventListener('input', () =>{
    check(element);
  })
})

const formHandler = (event: Event): void => {
  event.preventDefault();

  const checkAll = inputsArr.every(item => item.checkValidity() && item.value.length > 3);

  if (checkAll && fileUrl !== null) {
    inputsArr.forEach(element => {
      obj[element.id] = element.value.trim();
      element.classList.remove('invalid');
      element.nextElementSibling?.classList.remove('warning');
    });

    launchTicket();

  } else {
    inputsArr.forEach(element => check(element));
  }

}

submitForm.addEventListener('click', (event): void => formHandler(event));

const ticketForm = document.querySelector('.ticket-form') as HTMLDivElement;
const ticketGenerated = document.querySelector('.ticket-generated') as HTMLDivElement;

const launchTicket = () => {
  ticketForm.classList.add('hidden');
  ticketGenerated.classList.remove('hidden');

  const avatar = document.querySelector('.speaker-avatar') as HTMLImageElement;
  const email = document.querySelector('.email') as HTMLSpanElement;
  const name = document.querySelector('.speaker-name') as HTMLParagraphElement;
  const fullname = document.querySelector('.fullname') as HTMLSpanElement;
  const githubNick = document.querySelector('.github-nick-span') as HTMLParagraphElement;

  avatar.src = obj.url;
  email.innerText = obj['email-input'];
  name.innerHTML = obj.fullname;
  fullname.innerHTML = obj.fullname;
  githubNick.innerText = obj['github-input'];

}