let array = [];
let bars = [];

function generateArray() {
    let input = document.getElementById('arrayInput').value;
    let arr = input.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num));
    
    if (arr.length > 0) {
        array = arr;
        displayArray(array);
    } else {
        alert("Please enter a valid array of numbers.");
    }
}

function displayArray(arr) {
    let container = document.getElementById('arrayBars');
    container.innerHTML = '';
    arr.forEach(value => {
        let bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value * 10}px`;  // Scale the height for better visibility
        container.appendChild(bar);
    });
    bars = Array.from(container.getElementsByClassName('bar'));
}

async function startSorting() {
    let algorithm = document.getElementById('algorithm').value;
    let arrCopy = [...array];
    
    if (algorithm === 'bubble') {
        await bubbleSort(arrCopy);
    } else if (algorithm === 'selection') {
        await selectionSort(arrCopy);
    } else if (algorithm === 'insertion') {
        await insertionSort(arrCopy);
    }
}

async function bubbleSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap the bars in the UI
                await swapBars(j, j + 1);
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];  // Swap values
            }
        }
    }
    displayArray(arr);
}

async function selectionSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        // Swap the bars in the UI
        if (minIdx !== i) {
            await swapBars(i, minIdx);
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];  // Swap values
        }
    }
    displayArray(arr);
}

async function insertionSort(arr) {
    let n = arr.length;
    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            await swapBars(j + 1, j);
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    displayArray(arr);
}

async function swapBars(i, j) {
    let bar1 = bars[i];
    let bar2 = bars[j];
    
    // Highlight bars during the swap
    bar1.style.backgroundColor = '#e74c3c';
    bar2.style.backgroundColor = '#e74c3c';
    
    let tempHeight = bar1.style.height;
    bar1.style.height = bar2.style.height;
    bar2.style.height = tempHeight;
    
    // Reset the color after a small delay
    await new Promise(resolve => setTimeout(resolve, 500));
    bar1.style.backgroundColor = '#3498db';
    bar2.style.backgroundColor = '#3498db';
}
