import './styles/style.scss';

const submitForm = document.querySelector<HTMLInputElement>('input[type="submit"]');

const formHandler = (event: Event): void => {
  event.preventDefault();
};

submitForm?.addEventListener('click', (event): void => formHandler(event));

let fileUrl: string | null = null;

const fileInput = document.querySelector<HTMLInputElement>('#file-load');
const hintText = document.querySelector<HTMLSpanElement>('.hint-text');
const hint = document.querySelector<HTMLParagraphElement>('.hint');

const uploadIcon = document.querySelector<HTMLImageElement>('.upload-icon');
const instructionText = document.querySelector<HTMLParagraphElement>('.instruction-text');

const imgControlsBtns = document.querySelector<HTMLDivElement>('.img-controls-btns');
const uploadImg = document.querySelector<HTMLImageElement>('.upload-img');

const removeImgBtn = document.querySelector<HTMLButtonElement>('.remove-img');

const changeImgBtn = document.querySelector<HTMLButtonElement>('.change-img');

if (fileInput && hintText && uploadImg) {
  fileInput.addEventListener('change', (): void => {

    const file = fileInput.files?.[0]; 

    if (!file) {
      return;
    }

    if (file.size > 500 * 1024) {
      hint?.classList.add('warning');
      hintText.textContent = 'File too large. Please upload a photo under 500KB.';
      return;
    }

    hint?.classList.remove('warning');
    hintText.textContent = 'Upload your photo (JPG or PNG, max size: 500KB).';

    uploadIcon?.classList.add('hidden');
    instructionText?.classList.add('hidden');

    imgControlsBtns?.classList.remove('hidden');
    uploadImg.classList.remove('hidden');

    fileUrl = URL.createObjectURL(file);
    uploadImg.src = fileUrl;
 
  });

  removeImgBtn?.addEventListener('click', (event): void => {
    event.preventDefault();

    uploadIcon?.classList.remove('hidden');
    instructionText?.classList.remove('hidden');

    imgControlsBtns?.classList.add('hidden');
    uploadImg.classList.add('hidden');

    uploadImg.src = '';
  });

  changeImgBtn?.addEventListener('click', (event): void => {
    event.preventDefault();
    fileInput.click();
  });
}

const inputFullname = document.querySelector<HTMLInputElement>('#fullname');
const inputEmail = document.querySelector<HTMLInputElement>('#email-input');
const inputGithub = document.querySelector<HTMLInputElement>('#github-input');

inputFullname?.addEventListener('change', (event: Event):void => {
  const target = event.target as HTMLInputElement;
  console.log(target.value); // Выводим текущее значение
})

inputEmail?.addEventListener('change', ():void => {
  
})

inputGithub?.addEventListener('change', ():void => {
  
})