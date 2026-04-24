export interface Example {
  label: string;
  description: string;
  content: string;
}

export const examples: Example[] = [
  {
    label: "Strong doc",
    description: "Well-structured return policy article",
    content: `Meridian Commerce Platform -- Customer Returns and Refunds Policy
Version 4.2 | Effective date: March 1, 2025 | Owner: Customer Experience Policy Team

OVERVIEW

This article explains the complete returns and refunds process for purchases made through the Meridian Commerce Platform. It covers eligibility criteria, how to initiate a return, refund timelines, and exceptions. Customers and support agents should use this article as the authoritative reference for any question about reversing a transaction.

This policy applies to all purchases completed on or after January 1, 2024. For purchases made before that date, see the Legacy Returns Policy (document ID POL-2023-012), which remains in effect for those transactions.

ELIGIBILITY

A purchase is eligible for a full refund if all of the following conditions are met:

1. The return is initiated within 30 calendar days of the original purchase date.
2. The item is in its original condition: unused, unaltered, and with all original packaging and accessories included.
3. The item was purchased at full price or with a promotional discount. Items purchased through a clearance sale are not eligible for return (see "Clearance Items" below).
4. The customer provides proof of purchase, which may be the original order confirmation email, a receipt generated from the customer portal, or a transaction ID from a bank or payment provider statement.

If one or more of these conditions is not met, the purchase may still be eligible for a partial refund or store credit at the discretion of the reviewing agent. Agents should escalate cases involving partial refund decisions to the Tier 2 Returns Queue in the Meridian Support Console.

CLEARANCE ITEMS

Items marked "CLEARANCE" or "FINAL SALE" at the time of purchase are not eligible for return or refund under any circumstances. This restriction is displayed on the product page before purchase and on the order confirmation. Customers who contact support about clearance item returns should be informed of this policy and directed to the Meridian Community Forum for secondary marketplace options.

HOW TO INITIATE A RETURN

Customers may initiate a return through any of the following channels:

Customer Portal (preferred): Log in at portal.meridiancommerce.com, navigate to Order History, select the relevant order, and click "Request Return." The portal will generate a prepaid return shipping label automatically if the item is eligible.

Phone support: Call 1-800-555-0184 (available Monday through Friday, 9 AM to 6 PM Eastern Time). Support agents will verify eligibility, create a return case in the Meridian Support Console, and email the customer a prepaid return shipping label within one business day.

Email support: Send a message to returns@meridiancommerce.com with the subject line "Return Request: [Order ID]". Include the order ID, the reason for return, and photos of the item if the reason is damage or incorrect shipment. Email-initiated returns receive a response within two business days.

Once the customer ships the item back using the prepaid label, the package is tracked automatically. Customers can check return status in the Customer Portal under Order History.

REFUND PROCESSING

Refunds are processed to the original payment method. Processing timelines are:

- Credit or debit card: 5 to 7 business days from the date the returned item is received and inspected at the Meridian warehouse.
- PayPal or digital wallet: 3 to 5 business days from the date the returned item is received and inspected.
- Store credit: Issued within 24 hours of inspection completion.

Inspection is completed within one business day of warehouse receipt. Customers receive an email confirmation when inspection is complete and when the refund is issued.

If a refund has not appeared after the stated timeline, customers should first check with their bank or payment provider, as processing times on the financial institution side can vary. If the bank confirms no credit is pending after 10 business days from the refund issue date, customers should contact support with their return case number.

DAMAGED OR INCORRECT ITEMS

If a customer receives an item that is damaged in shipping or is not the item ordered, the standard 30-day window still applies, but the eligibility criteria for original condition and original packaging do not apply. Customers should:

1. Photograph the damage or the incorrect item and the shipping packaging before initiating a return.
2. Initiate the return through any of the channels listed above and select "Damaged" or "Incorrect Item" as the reason.
3. Attach the photographs to the return request.

For damaged or incorrect item returns, Meridian ships a replacement item (if in stock) or issues a full refund within 24 hours of the return request being approved. The customer is not required to ship the incorrect or damaged item back in these cases; Meridian will schedule pickup if the item is above $200 in value.

EXCEPTIONS AND EDGE CASES

Digital goods: Software licenses, digital downloads, and subscription activations are not eligible for return once the license key or download link has been accessed. Contact support within 7 days of purchase if the digital item is defective or was purchased in error; exceptions are handled case by case.

Gift returns: Items received as gifts may be returned for store credit only. The gift recipient must contact support with the order ID (obtainable from the gift sender) and proof that they are the intended recipient (the gift confirmation email sent to the recipient at time of purchase).

International orders: Returns from outside the United States follow the same eligibility criteria but use a different shipping label process. International customers must contact email support at returns@meridiancommerce.com to receive country-specific return instructions. Refund processing timelines for international orders may be up to 14 business days due to currency conversion processing.

AGENT REFERENCE SUMMARY

For support agents handling return requests, the decision tree is:

- Is the item a clearance or final sale item? If yes, deny and cite policy. If no, continue.
- Is the request within 30 days of purchase? If no and no extenuating circumstances, deny. If within 30 days, continue.
- Is the item in original condition (or is it a damage/incorrect item case)? If yes, approve. If no, escalate to Tier 2.
- Is proof of purchase available? If yes, approve and issue label. If no, ask for bank statement or ask customer to check email for order confirmation.

For cases that fall outside this decision tree, escalate to the Tier 2 Returns Queue in the Meridian Support Console with a case note explaining the exception.

DOCUMENT HISTORY

- Version 4.2 (March 1, 2025): Added international returns section; clarified digital goods exception window from 3 days to 7 days.
- Version 4.1 (September 12, 2024): Updated refund processing timelines to reflect new warehouse system.
- Version 4.0 (January 1, 2024): Full policy rewrite to cover new platform; replaced Legacy Returns Policy (POL-2023-012) for purchases from this date forward.`,
  },
  {
    label: "Problematic doc",
    description: "Internal escalation policy with contradictions and vague references",
    content: `INTERNAL ESCALATION PROCEDURES -- ENTERPRISE SUPPORT
Customer Success Operations | Last reviewed: sometime last year

PURPOSE

This document outlines the escalation procedures for enterprise accounts. When the standard resolution process is not working, this is the process to follow. It should be used when things get complicated.

SECTION 1: WHEN TO ESCALATE

Escalation is appropriate when an issue cannot be resolved within the standard timeframe. The standard timeframe is defined in the service level agreement (SLA) for each account tier. Tier 1 accounts have a standard timeframe of 24 hours. Enterprise accounts (which are different from Tier 1) have a standard timeframe of 4 hours.

If an issue is not resolved within the appropriate window, the agent should escalate to the relevant person on the escalation list. The escalation list is maintained separately and is updated regularly. To obtain the current escalation list, contact your manager or check the internal wiki.

If you are unsure whether an issue qualifies for escalation, use your judgment. When in doubt, it is generally better to escalate than to not escalate. However, over-escalating can create problems for the escalation team, so use this option carefully.

SECTION 2: THE ESCALATION PROCESS

To escalate an issue, do the following:

1. Document the issue thoroughly in the ticketing system. Include the account name, the issue description, the steps already taken, and the outcome of each step.
2. Notify the escalation team by sending an email to escalations@company.com with the subject line "ESCALATION: [Ticket ID]".
3. Update the ticket status to "Escalated" in the system.
4. Follow up with the customer to let them know that the issue is being escalated and that they will receive an update within the appropriate timeframe.

The appropriate timeframe for escalation responses is 2 hours for all accounts.

Note: For enterprise accounts, the escalation response time is 1 hour, not 2 hours. Please make sure to communicate the correct timeframe to the customer.

After the escalation is submitted, the escalation team takes over. The original agent remains the primary contact for the customer and is responsible for relaying information between the escalation team and the customer.

SECTION 3: PRIORITY LEVELS

Issues are assigned priority levels as follows:

Priority 1 (Critical): Complete service outage affecting the customer's core business operations. Response within 30 minutes.
Priority 2 (High): Significant degradation of service affecting a subset of users. Response within 1 hour.
Priority 3 (Medium): A bug or issue affecting some functionality but with a workaround available. Response within 4 hours.
Priority 4 (Low): Minor issue or cosmetic bug. Response within 24 hours.

Priority levels are assigned by the original agent based on the customer's description and the agent's assessment of impact. If the customer believes a Priority 3 issue should be Priority 2, they can request re-prioritization through the standard channel.

Note: The old priority system had 5 levels, not 4. Some documentation and some tickets may reference Priority 5, which was the old designation for "enhancement request" or "feature request." These are now handled through the product feedback process, not through support escalation. If a customer submits a Priority 5 ticket, follow the old process unless you are on the new system, in which case follow the new process.

SECTION 4: COMMUNICATION TEMPLATES

When notifying customers of an escalation, use the approved communication templates from the templates library. The templates library is located in the shared drive. If you do not have access to the shared drive, contact IT.

The templates cover the following scenarios: initial escalation notification, update during investigation, and resolution confirmation. Always use these templates rather than writing custom emails, as the templates have been reviewed by legal.

However, for enterprise accounts, the templates may need to be customized. Use your judgment to determine when customization is appropriate. Significant customization should be reviewed by your team lead before sending.

SECTION 5: ESCALATION FOR SECURITY ISSUES

Security-related issues should be escalated through a different process. This is covered in the Security Incident Response document, which is separate from this document. If you are dealing with a potential security issue, stop and refer to that document before proceeding.

Do not use the standard escalation email for security issues. The security escalation contact is different. Contact your manager for the security escalation contact information.

SECTION 6: DOCUMENTATION AND FOLLOW-UP

After an escalation is resolved, the original agent is responsible for:

1. Updating the ticket with the resolution details.
2. Confirming with the customer that the issue is fully resolved.
3. Completing the post-escalation form. The form is available in the internal tools section of the agent portal. All escalations must have a completed post-escalation form within 24 hours of resolution. This requirement was introduced in Q3 and applies to all escalations from that point forward.
4. Flagging any systemic issues to the team lead for potential escalation process improvement.

If the customer is not satisfied with the resolution, the issue can be re-escalated. Re-escalation follows the same process as initial escalation. In cases of repeated re-escalation on the same issue, the customer's account executive should be looped in. To identify the account executive for an enterprise account, check the account record in the CRM. For non-enterprise accounts, there is no assigned account executive; in this case, loop in the team lead.

SECTION 7: METRICS AND REPORTING

Escalation metrics are reviewed monthly by the Customer Success Operations team. Agents should be aware that escalation rates are tracked. High escalation rates may indicate a need for additional training. Low escalation rates may indicate that agents are not escalating when they should be.

The monthly report is distributed to all agents. For more information on how metrics are calculated, see the reporting documentation.

APPENDIX: FREQUENTLY ASKED QUESTIONS

Q: What if the escalation team does not respond within the defined timeframe?
A: Follow up by sending another email to escalations@company.com and also Slack-messaging the escalation team lead. If there is still no response after 30 minutes, escalate to your manager.

Q: Can I escalate directly to a senior engineer without going through the escalation team?
A: No. All escalations must go through the escalation team. Direct escalation to engineering is not permitted except in cases approved by the Vice President of Customer Success.

Q: What counts as a "security issue" for the purposes of Section 5?
A: Refer to the Security Incident Response document for a definition. This document does not cover that.`,
  },
  {
    label: "Stale doc",
    description: "Technical runbook with outdated references and TODOs",
    content: `DEPLOYMENT RUNBOOK -- PRODUCTION RELEASE PROCESS
Infrastructure & DevOps Team
Last updated: March 2021 | Author: Marcus T. (now on another team)

NOTE: This document was accurate as of Q1 2021. Some sections may be out of date following the infrastructure migration. TODO: update this after the migration is complete. (Update: migration finished, but no one updated this doc. Use with caution.)

OVERVIEW

This runbook describes the steps for deploying a new release to the production environment. It covers the full deployment lifecycle from build validation through post-deployment monitoring. It is intended for use by engineers with deploy access to our Heroku production environment.

As of this writing, we use Heroku for all production workloads. The staging environment also runs on Heroku. The development environment runs locally using docker-compose. Our Redis instance is managed through Heroku's Redis add-on (currently on the Premium 2 plan, though we discussed upgrading to Premium 3 in the Q4 planning meeting -- check if that happened).

PRE-DEPLOYMENT CHECKLIST

Before deploying, confirm the following:

1. The build is passing in CircleCI. The CircleCI project is at app.circleci.com/pipelines/github/[our-org]/[our-repo]. As of January 2021, we also integrated Snyk for dependency scanning. The Snyk check must be passing as well. (TODO: confirm Snyk is still configured after the GitHub org rename in August.)

2. The release branch has been merged into main and the commit is tagged. Tags follow the format v[MAJOR].[MINOR].[PATCH], e.g., v2.14.3. The last release was v2.14.3 in February 2021 -- we should be on v3.x by now but this doc hasn't been updated.

3. Database migrations have been reviewed by a senior engineer. Migrations run automatically as part of the deploy process via our Heroku Release Phase. If there are no migrations in this release, this step can be skipped. Note: in November 2020 we had an incident where a migration caused 45 minutes of downtime (postmortem in Confluence, search for "Nov 2020 Migration Incident"). Always test on staging first.

4. The feature flags for the release have been configured in LaunchDarkly. As of this writing we have 14 active feature flags. TODO: get the current flag inventory from Ryan before the next release.

5. Notify the #releases Slack channel at least 30 minutes before deploying. Use the release notification template pinned to the channel. (Note: as of September 2021 this channel was renamed. Ask someone if you're not sure what it's called now.)

DEPLOYMENT STEPS

Step 1: Promote the staging Heroku application to production.

Log into the Heroku dashboard at dashboard.heroku.com. Navigate to our Pipeline (name: [app-name]-pipeline -- I can never remember the exact name, check with someone). Select the staging application and click "Promote to Production."

Alternatively, use the Heroku CLI:
  heroku pipelines:promote -a [staging-app-name] --to [production-app-name]

As of March 2021, the staging app name is [app-name]-staging and the production app name is [app-name]-prod. These may have changed. (Update: they definitely changed at some point. Check with whoever is now responsible for infrastructure.)

Step 2: Monitor the Heroku activity feed.

After promoting, watch the Heroku activity feed for the production application. The Release Phase will run first (database migrations, cache warming). This typically takes 3-5 minutes but took as long as 22 minutes during the November incident.

Step 3: Confirm dyno health.

Run the following command to confirm all dynos are running:
  heroku ps -a [production-app-name]

Expected output shows all web and worker dynos in "up" state. We typically run 3 web dynos and 2 worker dynos in production. (This was accurate in early 2021. Dyno counts may have changed.)

Step 4: Smoke test.

After dynos are up, run the smoke test suite:
  bundle exec rspec spec/smoke/ --tag smoke

The smoke tests hit the production environment directly. They require the PRODUCTION_API_KEY environment variable to be set in your local terminal. Ask Marcus or check the 1Password vault for the key. (Marcus is no longer on the team. Check with the current infra lead for vault access.)

Step 5: Monitor error rates.

Watch the Datadog dashboard for 15 minutes post-deploy. The relevant dashboard is "Production Web - Request Overview." Acceptable error rate is below 0.5%. If the error rate spikes above 2% sustained for 3 minutes, initiate rollback.

As of this writing our Datadog org URL is [company].datadoghq.com. We are on the Pro plan (14-day retention). This is relevant if you need to look at logs from a deployment more than 14 days ago.

ROLLBACK PROCEDURE

If a deployment needs to be rolled back, do the following:

1. In the Heroku dashboard, navigate to the production application and click "Activity." Find the previous successful release and click "Roll back to here."

2. Notify the #releases channel (see note above about channel rename) immediately.

3. If the issue is database-migration-related, rollback is more complex. Contact a senior engineer immediately. Do not attempt to roll back migrations without guidance. In 2020 we lost approximately 3 hours of order data due to an improper migration rollback. The postmortem is in Confluence.

4. After rollback, file an incident report using the incident report template. As of Q1 2021 the template is in Confluence under DevOps > Incident Reports. TODO: check if this moved after the Notion migration.

POST-DEPLOYMENT STEPS

1. Update the deployment log in our internal tracker. As of March 2021 this is a Google Sheet shared with the engineering team. (Update: we talked about replacing this with something better. Not sure if that happened.)

2. Close the release ticket in Jira. The release ticket should link to all tickets included in the release. If any tickets are not closed, investigate before closing the release ticket.

3. Announce the release in #product-updates with a brief summary of what changed. Use the format from previous announcements in that channel.

CONTACTS

- Infrastructure lead: Marcus T. (no longer on team -- find current owner)
- Heroku account owner: check with Finance or whoever manages vendor accounts
- Datadog: ask the current infra lead
- LaunchDarkly: Ryan M. (verify this is still accurate)
- PagerDuty on-call: check the current rotation in PagerDuty

KNOWN ISSUES AS OF MARCH 2021

- The staging environment sometimes gets out of sync with production dependencies. If you see unexpected errors on staging that don't reproduce locally, try running heroku run bundle install -a [staging-app-name].
- CircleCI builds occasionally fail due to a race condition in the test suite. Retry once before investigating.
- The LaunchDarkly SDK was updated in January 2021 and there may be compatibility issues with older flag configurations. Check the LaunchDarkly changelog if you see unexpected feature flag behavior.`,
  },
  {
    label: "Mediocre doc",
    description: "Customer onboarding guide with terminology drift and a coverage gap",
    content: `Novaflow Platform -- New Customer Onboarding Guide
Customer Success Team | Updated by: Onboarding Pod

WELCOME TO NOVAFLOW

Thank you for joining Novaflow. This guide walks you through the first steps to get your team up and running on the platform. By the end of this guide, you should have your workspace configured, your first project created, and your team members invited.

If you have questions during onboarding that this guide does not answer, contact your customer success manager or email onboarding@novaflow.com.

STEP 1: SETTING UP YOUR WORKSPACE

When you first log in, you will be prompted to name your workspace. Your workspace is the top-level container for everything your organization does in Novaflow: projects, data, integrations, and users. Choose a name that reflects your organization clearly, as this name will appear in notifications and shared links.

Once your workspace is created, you will see the Novaflow dashboard. The dashboard shows an overview of your active projects, recent activity, and any onboarding tasks still outstanding.

To configure workspace settings, click your workspace name in the top navigation bar and select "Workspace Settings." From there you can:
- Update the workspace display name
- Set the default timezone for the workspace (used in scheduled tasks and reporting)
- Configure notification preferences for all workspace members
- Set up single sign-on (SSO) if your organization uses it (see the SSO Configuration Guide for setup instructions)

STEP 2: CREATING YOUR FIRST PROJECT

Within your workspace, projects are the primary organizational unit. Each project has its own data pipeline configurations, integrations, and access controls. A single workspace can contain many projects.

To create a project:
1. From the dashboard, click "New Project" in the top right corner.
2. Enter a project name and optional description.
3. Choose a project template if applicable. Templates pre-configure common pipeline structures for use cases like marketing analytics, support ticket routing, or e-commerce event tracking.
4. Click "Create Project."

Your new project will appear in the project list on the dashboard. Click it to open the project workspace.

STEP 3: CONNECTING YOUR DATA SOURCES

Within a project environment, you connect data sources that feed into your pipelines. (Note: this guide previously referred to the project view as the "project workspace" in Step 2 -- both terms refer to the same thing. The current UI labels this area "project environment" as of the last interface update.)

To add a data source:
1. In the project environment, click "Sources" in the left navigation.
2. Click "Add Source."
3. Select your source type from the catalog. Novaflow supports native connectors for Salesforce, HubSpot, Zendesk, Snowflake, BigQuery, and a generic REST API connector.
4. Follow the connector-specific setup wizard. Each wizard will prompt you for the required credentials and configuration.

Once a source is connected, Novaflow runs an initial sync. Depending on the data volume, this may take from a few minutes to several hours. You will receive an email when the initial sync completes.

STEP 4: INVITING YOUR TEAM

To add team members to your workspace, navigate to Workspace Settings and select "Members."

Click "Invite Member" and enter the email addresses of the people you want to add. You can invite multiple people at once by entering addresses separated by commas.

Each invited user will receive an email with a link to accept the invitation. The link expires after 72 hours. If someone's invitation expires before they accept, you can resend it from the Members page.

When inviting members, you assign them a role:
- Admin: Full access to all workspace settings and all projects.
- Member: Access to projects they are explicitly added to. Cannot modify workspace-level settings.
- Viewer: Read-only access to projects they are added to. Cannot create or modify any data.

To add a member to a specific project after they have joined the workspace, open that project environment and navigate to the "Team" section in the left navigation.

STEP 5: CONFIGURING YOUR FIRST PIPELINE

Once your data sources are connected and your team is set up, you are ready to configure a pipeline. A pipeline defines how data flows from your sources through transformation steps to a destination.

To create a pipeline:
1. In the project environment, click "Pipelines" in the left navigation.
2. Click "New Pipeline."
3. Select a source from the sources you connected in Step 3.
4. Define your transformation steps. Transformations can include filtering, field mapping, aggregations, and custom logic using Novaflow's formula editor.
5. Select a destination. Destinations are the systems or storage locations where transformed data is sent.
6. Configure the pipeline schedule or set it to run in real time.
7. Click "Save and Activate."

For advanced pipeline configuration, including branching logic, error handling, and retry policies, see the admin guide.

TROUBLESHOOTING COMMON ONBOARDING ISSUES

Issue: I did not receive an invitation email.
Resolution: Check your spam folder. If the email is not there, ask the workspace admin to resend the invitation from the Members page in Workspace Settings.

Issue: My data source connection is failing.
Resolution: Verify that the credentials you entered have the required permissions. For Salesforce connections, the connected user must have the "API Enabled" permission in Salesforce. For other connectors, refer to the connector-specific documentation in the Novaflow Help Center.

Issue: The initial sync is taking longer than expected.
Resolution: Large data volumes can result in longer initial syncs. Check the sync status in the Sources panel. If the sync has been running for more than 24 hours without completing, contact support.

NEXT STEPS

Once you have completed the steps in this guide, your team is ready to start building in Novaflow. For more information on specific features and advanced configuration, see the Novaflow documentation at docs.novaflow.com or contact your customer success manager.`,
  },
];

function formatBatchExample(): string {
  const names = [
    "Meridian Returns Policy",
    "Enterprise Escalation Procedures",
    "Production Deployment Runbook",
    "Novaflow Onboarding Guide",
  ];
  return examples
    .map((ex, i) => `# ${names[i]}\n\n${ex.content}`)
    .join("\n\n---\n\n");
}

export const batchExampleContent: string = formatBatchExample();
