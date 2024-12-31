# Contact Us

<script>
  const form = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const messageStatus = document.getElementById("messageStatus");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Clear old messages & set button state
    messageStatus.style.display = "none";
    messageStatus.classList.remove("success", "error");
    messageStatus.textContent = "";
    submitBtn.disabled = true;
    submitBtn.innerText = "Sending...";

    const formData = new FormData(form);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const json = await response.json();

      if (json.success) {
        // Show success block
        messageStatus.textContent = "✓ Message sent successfully!";
        messageStatus.classList.add("success");
        messageStatus.style.display = "block";

        // Optionally reset the form
        form.reset();
      } else {
        // Show error block
        messageStatus.textContent =
          "✗ An error occurred: " + (json.message || "Please try again later.");
        messageStatus.classList.add("error");
        messageStatus.style.display = "block";
      }
    } catch (error) {
      // Network or unexpected error
      messageStatus.textContent = "✗ Could not send message. " + error.message;
      messageStatus.classList.add("error");
      messageStatus.style.display = "block";
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerText = "Send Message";
    }
  });
</script>

<form
  action="https://api.web3forms.com/submit"
  method="POST"
  class="contact-form"
  id="contactForm"
>
  <!-- 1) Your Access Key from Web3Forms -->
  <input type="hidden" name="access_key" value="9c04327a-dea1-4938-8b84-37de91941a7b" />

  <!-- Uncomment below to test emails without sending them -->
  <!-- <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE"> -->

  <!-- 2) Optional honeypot field for spam control -->
  <input type="hidden" name="honeypot" value="" />

  <!-- Optional: But Recommended: To Prevent SPAM Submission.  Make sure its hidden by default -->
  <input type="checkbox" name="botcheck" id="" style="display: none;">

  <!-- 3) Remove the redirect if you want a single-page (AJAX) submission -->
  <!-- <input type="hidden" name="redirect" value="https://example.com/thank-you" /> -->

  <!-- 4) Form "from" name -->
  <input type="hidden" name="RocPy Contact Noticfication" value="Mission Control">

  <div class="input-group">
    <label for="name">Name</label>
    <input 
      type="text" 
      name="name" 
      id="name" 
      placeholder="Your Name" 
      required
    />
  </div>

  <div class="input-group">
    <label for="email">Email</label>
    <input 
      type="email" 
      name="email" 
      id="email" 
      placeholder="Your Email" 
      required
    />
  </div>

  <div class="input-group">
    <label for="subject">Subject</label>
    <input
        type="text"
        name="subject"
        id="subject"
        placeholder="Subject"
        required
    />
  </div>

  <div class="input-group">
    <label for="message">Message</label>
    <textarea 
      name="message" 
      id="message" 
      rows="5" 
      placeholder="Your message" 
      required
    ></textarea>
  </div>

  <button type="submit" id="submitBtn">Send Message</button>
</form>

<!-- Hidden by default; shown on success or error -->
<div id="messageStatus" class="message-status" style="display: none;"></div>
