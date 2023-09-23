const openDigger = require("../src/open_digger");

import * as fs from "fs";
const assert = require("assert");
import * as _ from "lodash";

function deepEqual(a: any, b: any): boolean {
  return _.isEqual(a, b);
}

async function validate_data(
  apiFn: Function,
  subFileName: string,
  dataKey: string
) {
  const fileName = `../test/testdata/${subFileName}/${dataKey}.json`;

  if (fs.existsSync(fileName)) {
    const jsonData = JSON.parse(fs.readFileSync(fileName).toString());

    const data1 = jsonData[dataKey];

    const data2 = await apiFn(jsonData["modifiedOption"]);

    const data1WithoutDetail = removeFields(data1);

    const data2WithoutDetail = removeFields(data2);

    const equal = deepEqual(data1WithoutDetail, data2WithoutDetail);

    if (!equal) {
      console.log(jsonData["modifiedOption"]);
      console.log(apiFn);
      console.log("data1:", JSON.stringify(data1WithoutDetail));
      console.log("data2:", JSON.stringify(data2WithoutDetail));
    }
    assert(equal);
  }
}

function removeFields(data: any) {
  if (Array.isArray(data)) {
    return data.map((item) => removeFields(item));
  }

  if (typeof data === "object" && data !== null) {
    const newData: { [key: string]: any } = {};

    for (const key in data) {
      if (
        !key.startsWith("quantile_") &&
        !key.startsWith("detail") &&
        !key.startsWith("avg") &&
        !key.startsWith("levels") &&
        !key.startsWith("openrank")
      ) {
        newData[key] = removeFields(data[key]);
      }
    }

    return newData;
  }

  return data;
}

const orderOptions = ["DESC"];
const limitOptions = ["all"];
const limitOptions1 = [3];
const groupTimeRangeOptions = ["year", "quarter", "month"];
const groupByOptions = [null, "org"];


describe("Data tests", () => {
  before(function () {
    this.timeout(100000);
  });

  try {
    for (const order of orderOptions) {
      for (const limit of limitOptions1) {
        for (const limitOption of limitOptions) {
          for (const groupBy of groupByOptions) {
            for (const groupTimeRange of groupTimeRangeOptions) {
              // 调用 validateData
              it("should test issuesNew interface", async () => {
                const issues_new_file_name =
                  `issues_new_${order}_${limit}_${limitOption}_${groupBy}_${groupTimeRange}`.toLowerCase();
                await validate_data(
                  openDigger.metric.chaoss.issuesNew,
                  "issues_new",
                  issues_new_file_name
                );
              });

              it("should test issuesClosed interface", async () => {
                const issues_closed_file_name =
                  `issues_closed_${order}_${limit}_${limitOption}_${groupBy}_${groupTimeRange}`.toLowerCase();
                await validate_data(
                  openDigger.metric.chaoss.issuesClosed,
                  "issues_closed",
                  issues_closed_file_name
                );
              });

              it("should test busFactor interface", async () => {
                const bus_factor_file_name =
                  `bus_factor_${order}_${limit}_${limitOption}_${groupBy}_${groupTimeRange}`.toLowerCase();
                await validate_data(
                  openDigger.metric.chaoss.busFactor,
                  "bus_factor",
                  bus_factor_file_name
                );
              });
              it("should test codeChangeCommits interface", async () => {
                const code_change_commits_file_name =
                  `code_change_commits_${order}_${limit}_${limitOption}_${groupBy}_${groupTimeRange}`.toLowerCase();
                await validate_data(
                  openDigger.metric.chaoss.codeChangeCommits,
                  "code_change_commits",
                  code_change_commits_file_name
                );
              });

              it("should test issuesAndChangeRequestActive interface", async () => {
                const issues_and_change_request_active_file_name =
                  `issues_and_change_request_active_${order}_${limit}_${limitOption}_${groupBy}_${groupTimeRange}`.toLowerCase();
                await validate_data(
                  openDigger.metric.chaoss.issuesAndChangeRequestActive,
                  "issues_and_change_request_active",
                  issues_and_change_request_active_file_name
                );
              });

              it("should test changeRequestsAccepted interface", async () => {
                const change_requests_accepted_file_name =
                  `change_requests_accepted_${order}_${limit}_${limitOption}_${groupBy}_${groupTimeRange}`.toLowerCase();
                await validate_data(
                  openDigger.metric.chaoss.changeRequestsAccepted,
                  "change_requests_accepted",
                  change_requests_accepted_file_name
                );
              });

              it("should test changeRequestsDeclined interface", async () => {
                const change_requests_declined_file_name =
                  `change_requests_declined_${order}_${limit}_${limitOption}_${groupBy}_${groupTimeRange}`.toLowerCase();
                await validate_data(
                  openDigger.metric.chaoss.changeRequestsDeclined,
                  "change_requests_declined",
                  change_requests_declined_file_name
                );
              });
              it("should test codeChangeLines interface", async () => {
                const code_change_lines_file_name =
                  `code_change_lines_${order}_${limit}_${limitOption}_${groupBy}_${groupTimeRange}`.toLowerCase();
                await validate_data(
                  openDigger.metric.chaoss.codeChangeLines,
                  "code_change_lines",
                  code_change_lines_file_name
                );
              });
              it("should test technicalFork interface", async () => {
                const technical_fork_file_name =
                  `technical_fork_${order}_${limit}_${limitOption}_${groupBy}_${groupTimeRange}`.toLowerCase();
                await validate_data(
                  openDigger.metric.chaoss.technicalFork,
                  "technical_fork",
                  technical_fork_file_name
                );
              });
              it("should test issueAge interface", async () => {
                const issue_age_file_name =
                  `issue_age_${order}_${limit}_${limitOption}_${groupBy}_${groupTimeRange}`.toLowerCase();
                await validate_data(
                  openDigger.metric.chaoss.issueAge,
                  "issue_age",
                  issue_age_file_name
                );
              });
              it("should test changeRequestAge interface", async () => {
                const change_request_age_file_name =
                  `change_request_age_${order}_${limit}_${limitOption}_${groupBy}_${groupTimeRange}`.toLowerCase();
                await validate_data(
                  openDigger.metric.chaoss.changeRequestAge,
                  "change_request_age",
                  change_request_age_file_name
                );
              });
              it("should test repoActiveDatesAndTimes interface", async () => {
                const repo_active_dates_and_times_file_name =
                  `repo_active_dates_and_times_${order}_${limit}_${limitOption}_${groupBy}_${groupTimeRange}`.toLowerCase();
                await validate_data(
                  openDigger.metric.chaoss.repoActiveDatesAndTimes,
                  "repo_active_dates_and_times",
                  repo_active_dates_and_times_file_name
                );
              });
              it("should test userActiveDatesAndTimes interface", async () => {
                const user_active_dates_and_times_file_name =
                  `user_active_dates_and_times_${order}_${limit}_${limitOption}_${groupBy}_${groupTimeRange}`.toLowerCase();
                await validate_data(
                  openDigger.metric.chaoss.userActiveDatesAndTimes,
                  "user_active_dates_and_times",
                  user_active_dates_and_times_file_name
                );
              });
              it("should test issueResolutionDuration interface", async () => {
                const issue_resolution_duration_file_name =
                  `issue_resolution_duration_${order}_${limit}_${limitOption}_${groupBy}_${groupTimeRange}`.toLowerCase();
                await validate_data(
                  openDigger.metric.chaoss.issueResolutionDuration,
                  "issue_resolution_duration",
                  issue_resolution_duration_file_name
                );
              });
              it("should test changeRequestResolutionDuration interface", async () => {
                const change_request_resolution_duration_file_name =
                  `change_request_resolution_duration_${order}_${limit}_${limitOption}_${groupBy}_${groupTimeRange}`.toLowerCase();
                await validate_data(
                  openDigger.metric.chaoss.changeRequestResolutionDuration,
                  "change_request_resolution_duration",
                  change_request_resolution_duration_file_name
                );
              });
              it("should test changeRequestsDuration interface", async () => {
                const change_requests_duration_file_name =
                  `change_requests_duration_${order}_${limit}_${limitOption}_${groupBy}_${groupTimeRange}`.toLowerCase();
                await validate_data(
                  openDigger.metric.chaoss.changeRequestsDuration,
                  "change_requests_duration",
                  change_requests_duration_file_name
                );
              });
              it("should test newContributors interface", async () => {
                const new_contributors_file_name =
                  `new_contributors_${order}_${limit}_${limitOption}_${groupBy}_${groupTimeRange}`.toLowerCase();
                await validate_data(
                  openDigger.metric.chaoss.newContributors,
                  "new_contributors",
                  new_contributors_file_name
                );
              });
              it("should test changeRequestsDeclined interface", async () => {
                const inactive_contributors_file_name =
                  `inactive_contributors_${order}_${limit}_${limitOption}_${groupBy}_${groupTimeRange}`.toLowerCase();
                await validate_data(
                  openDigger.metric.chaoss.inactiveContributors,
                  "inactive_contributors",
                  inactive_contributors_file_name
                );
              });
              it("should test changeRequestsDeclined interface", async () => {
                const change_requests_acceptance_ratio_file_name =
                  `change_requests_acceptance_ratio_${order}_${limit}_${limitOption}_${groupBy}_${groupTimeRange}`.toLowerCase();
                await validate_data(
                  openDigger.metric.chaoss.changeRequestsAcceptanceRatio,
                  "change_requests_acceptance_ratio",
                  change_requests_acceptance_ratio_file_name
                );
              });
              it("should test getRepoActivity interface", async () => {
                const repo_activity_file_name =
                  `repo_activity_${order}_${limit}_${limitOption}_${groupBy}_${groupTimeRange}`.toLowerCase();
                await validate_data(
                  openDigger.index.activity.getRepoActivity,
                  "repo_activity",
                  repo_activity_file_name
                );
              });
              it("should test getUserActivity interface", async () => {
                const user_activity_file_name =
                  `user_activity_${order}_${limit}_${limitOption}_${groupBy}_${groupTimeRange}`.toLowerCase();
                await validate_data(
                  openDigger.index.activity.getUserActivity,
                  "user_activity",
                  user_activity_file_name
                );
              });
              it("should test repoParticipants interface", async () => {
                const repo_participants_file_name =
                  `repo_participants_${order}_${limit}_${limitOption}_${groupBy}_${groupTimeRange}`.toLowerCase();
                await validate_data(
                  openDigger.metric.xlab.repoParticipants,
                  "repo_participants",
                  repo_participants_file_name
                );
              });
              it("should test repoStars interface", async () => {
                const repo_stars_file_name =
                  `repo_stars_${order}_${limit}_${limitOption}_${groupBy}_${groupTimeRange}`.toLowerCase();
                await validate_data(
                  openDigger.metric.xlab.repoStars,
                  "repo_stars",
                  repo_stars_file_name
                );
              });
              it("should test attention interface", async () => {
                const attention_file_name =
                  `attention_${order}_${limit}_${limitOption}_${groupBy}_${groupTimeRange}`.toLowerCase();
                await validate_data(
                  openDigger.index.attention.getAttention,
                  "attention",
                  attention_file_name
                );
              });
            }
          }
        }
      }
    }

    console.log("All passed.");
  } catch (err) {
    console.error(err);
  }
});