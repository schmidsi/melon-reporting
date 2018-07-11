## Standard Report Web Interface

The final step is to visualize the extracted data in a nice looking report

- Takes a standard report data JSON as input and visualizes it
  - This decouples the web interface from the rest of the system: It could just be mock-data.
- The web interface follows the mockup as close as possible

- Implementation of the Mockup as a web interface
- URL Scheme: `/report/:fundAddress/:timeSpanStart/:timeSpanEnd`
