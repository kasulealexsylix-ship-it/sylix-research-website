document.getElementById('projectForm').addEventListener('submit', function(e){
  e.preventDefault();
  const data = new FormData(e.target);
  const msg = `Hello Sylix Research Consultants, I want to start a project.%0A%0AName: ${encodeURIComponent(data.get('name'))}%0AContact: ${encodeURIComponent(data.get('contact'))}%0AService: ${encodeURIComponent(data.get('service'))}%0ADeadline: ${encodeURIComponent(data.get('deadline') || 'Not specified')}%0ADetails: ${encodeURIComponent(data.get('details') || 'Not specified')}`;
  window.open(`https://wa.me/256775881765?text=${msg}`, '_blank');
});
