export const uploadFile = (): Promise<HTMLImageElement> => {
    const uploadInput = document.createElement('input');
    uploadInput.type = 'file';
    uploadInput.style.display = 'none';
    document.body.appendChild(uploadInput);

    return new Promise<HTMLImageElement>((resolve, reject) => {
        uploadInput.addEventListener('change', function (event) {
            const target = event.target as HTMLInputElement;
            const files = target.files as FileList;
            const file = files[0];

            if (file) {
                const reader = new FileReader();

                reader.onload = function (e) {
                    const img = new Image();
                    img.onload = function () {
                        resolve(img);
                    };

                    if(!e.target || !e.target.result){
                        reject('File havnt been loaded');
                        return;
                    }
                    img.src = e.target.result as string;
                };

                reader.readAsDataURL(file);
            } else {
                reject('File havnt been chosen');
            }
        });
        uploadInput.click();
    }).finally(() => document.body.removeChild(uploadInput));
}
