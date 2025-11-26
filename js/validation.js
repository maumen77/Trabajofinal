document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('presupuesto-form');
  if(!form) return;

  const nombre = document.getElementById('nombre');
  const apellidos = document.getElementById('apellidos');
  const telefono = document.getElementById('telefono');
  const email = document.getElementById('email');
  const producto = document.getElementById('producto');
  const plazo = document.getElementById('plazo');
  const extras = document.querySelectorAll('.extra');
  const precioFinalEl = document.getElementById('precio-final');
  const acepto = document.getElementById('acepto');

  const nameRegex = /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]{1,15}$/;
  const surnameRegex = /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]{1,40}$/;
  const phoneRegex = /^\d{1,9}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function calcular(){
    const selected = producto.options[producto.selectedIndex];
    const base = Number(selected.dataset.price || 0);
    let total = base;
    extras.forEach(e => { if(e.checked) total += Number(e.dataset.price || 0); });
    const months = Number(plazo.value || 1);
    if (months >= 6) total = total * 0.9;
    precioFinalEl.textContent = total.toFixed(2) + ' €';
    return total;
  }

  producto.addEventListener('change', calcular);
  plazo.addEventListener('input', calcular);
  extras.forEach(e => e.addEventListener('change', calcular));
  calcular();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const messages = [];
    if (!nameRegex.test(nombre.value.trim())) messages.push('Nombre inválido (solo letras, max 15).');
    if (!surnameRegex.test(apellidos.value.trim())) messages.push('Apellidos inválidos (solo letras, max 40).');
    if (!phoneRegex.test(telefono.value.trim())) messages.push('Teléfono inválido (solo números, max 9).');
    if (!emailRegex.test(email.value.trim())) messages.push('Correo inválido.');
    if (!acepto.checked) messages.push('Debes aceptar las condiciones.');

    const msgsBox = document.getElementById('form-messages');
    if (messages.length) {
      msgsBox.innerHTML = '<p style="color:red">' + messages.join('<br>') + '</p>';
      return;
    }
    const presupuesto = {
      nombre: nombre.value.trim(),
      apellidos: apellidos.value.trim(),
      telefono: telefono.value.trim(),
      email: email.value.trim(),
      producto: producto.value,
      plazo: plazo.value,
      precio: calcular()
    };
    msgsBox.innerHTML = '<p style="color:green">Presupuesto calculado: ' + presupuesto.precio.toFixed(2) + ' € (enviado)</p>';
    console.log('Presupuesto (simulado):', presupuesto);

  });
});