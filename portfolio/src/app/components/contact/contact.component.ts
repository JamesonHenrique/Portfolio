import { Component, HostListener } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  isVisible = false;
  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  redirectTo(url: string) {
    window.open(url, '_blank');
  }

  ngOnInit() {
    this.checkVisibility();
  }

  @HostListener('window:scroll')
  checkVisibility() {
    if (this.isVisible) return;

    const contactSection = document.getElementById('contato');
    if (!contactSection) return;

    const rect = contactSection.getBoundingClientRect();
    const isVisible = (rect.top <= window.innerHeight * 0.7) && (rect.bottom >= 0);

    if (isVisible) {
      this.isVisible = true;
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid) {

      console.log('Formulário válido, enviando...', this.formData);


    }
  }
}
