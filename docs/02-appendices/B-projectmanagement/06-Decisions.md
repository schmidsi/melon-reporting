# Decisions

## 2018-04-26

### Use Cases
For the Use Case diagram, we decided to exclude the function "Comment timespan". A fund manager would have been able to save an off-chain comment about a timespan which would later on show in a report.
However, it is not possible to include something like this in the report, because adding such a comment later on or changing the comment would change the hash of the document and would therefore invalidate past audits.
If a fund manager wants to communicate with their investors through these comments, there are other ways to do this, e.g. with blog posts or through Melon Mail.
