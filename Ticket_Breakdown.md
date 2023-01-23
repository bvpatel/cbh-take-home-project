# Ticket Breakdown
We are a staffing company whose primary purpose is to book agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Tickets for Adding Custom agent id Feature

#### Ticket 1: Add a new column for the custom agent id in the agents table
- **Acceptance Criteria:** The `agents` table should have a new column for custom agent id to the agents table that will allow Facilities to save their custom ids for each agent they work with.
- **Time/Effort Estimate:** 3 hour
- **Implementation Details:**
    - Add the new column in the agents table, called `custom_agent_id`, and set it to allow `null` values
    - Update the database schema and perform any necessary migration

#### Ticket 2: Update the getShiftsByFacility function to include custom agent id
- **Acceptance Criteria:** The `getShiftsByFacility` function should also return the custom agent id for each agent with all other agent-related information.
- **Time/Effort Estimate:** 4 hour
- **Implementation Details:**
    - Update the `getShiftsByFacility` function to include the custom agent id in the metadata that it returns for each agent
    - Test the function to ensure that it is returning the correct custom agent id

#### Ticket 3: Update the generateReport function to use the custom agent id
- **Acceptance Criteria:** The `generateReport` function should use the custom agent id for each agent instead of the internal database id when generating the report.
- **Time/Effort Estimate:** 4 hour
- **Implementation Details:**
    - Update the `generateReport` function to use the custom agent id for each agent instead of the internal database id when generating the report
    - If the custom agent id is null, an internal database id will be used.
    - Test the function to ensure that it is using the correct custom agent id

#### Ticket 4: Update the user interface for Facilities to enter custom agent id
- **Acceptance Criteria:**  The user interface for Facilities should allow them to enter a custom agent id for each agent they work with.
- **Time/Effort Estimate:** 6 hour
- **Implementation Details:**
    - Add a new field for custom agent id in the user interface for Facilities
    - Update the functionality to save the custom agent id in the database when entered by the Facility
    - Test the user interface to ensure that it is working as expected