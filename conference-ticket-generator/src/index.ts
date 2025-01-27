import './styles/style.scss';

const submitForm = document.querySelector('input[type="submit"]') as HTMLInputElement;

const formHandler = (event: Event): void => {
  event.preventDefault();
};

submitForm.addEventListener('click', (event): void => formHandler(event));

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

const uploadFile = (file: File) => {
  if (file.size > 500 * 1024) {
    hint.classList.add('warning');
    hintText.textContent = 'File too large. Please upload a photo under 500KB.';
    return;
  }

  hint.classList.remove('warning');
  hintText.textContent = 'Upload your photo (JPG or PNG, max size: 500KB).';

  uploadIcon.classList.add('hidden');
  instructionText?.classList.add('hidden');

  imgControlsBtns.classList.remove('hidden');
  uploadImg.classList.remove('hidden');

  fileUrl = URL.createObjectURL(file);
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

changeImgBtn?.addEventListener('click', (event): void => {
  event.preventDefault();
  fileInput.click();
});