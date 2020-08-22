export const triggers: Record<string, { activityTypes: string[] }> = {
  'pull-request': {
    activityTypes: [
      'assigned',
      'unassigned',
      'labeled',
      'unlabeled',
      'opened',
      'edited',
      'closed',
      'reopened',
      'synchronize',
      'ready_for_review',
      'locked',
      'unlocked',
      'review_requested',
      'review_request_removed',
    ],
  },
  issues: {
    activityTypes: [
      'opened',
      'edited',
      'deleted',
      'transferred',
      'pinned',
      'unpinned',
      'closed',
      'reopened',
      'assigned',
      'unassigned',
      'labeled',
      'unlabeled',
      'locked',
      'unlocked',
      'milestoned',
      'demilestoned',
    ],
  },
  push: {
    activityTypes: [],
  },
}

export const runsOnParameters = [
  'ubuntu-latest',
  'ubuntu-20.04',
  'ubuntu-18.04',
  'ubuntu-16.04',
  'macos-latest',
  'macos-10.15',
  'windows-latest',
  'windows-2019',
]
