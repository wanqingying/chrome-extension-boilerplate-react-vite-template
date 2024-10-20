import { toggleTheme } from '@src/toggleTheme';
import { kit } from './kit';
import { sampleFunction } from '@src/sampleFunction';

console.log('content script loaded');

void toggleTheme();
void kit();
// Shows how to call a function defined in another module
sampleFunction();
