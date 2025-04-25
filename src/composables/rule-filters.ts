import { computed, ref } from "vue";

const createDefaultState = (values: string[]): Record<string, boolean> => {
  return values.reduce((acc, value) => ({ ...acc, [value]: false }), {});
};

const isFilterEnabled = (filter: RuleFilter): boolean => {
  return Object.values(filter).some((value) => value);
};

export type RuleFilter = Record<string, boolean>;

export type RuleFilters = {
  languages: Record<string, boolean>;
  severities: Record<RuleSeverity, boolean>;
  statuses: Record<RuleStatus, boolean>;
};

export const useRuleFilters = (rulesSpecifications: RulesSpecifications) => {
  const meta: RuleMeta = {
    languages: new Set<string>(),
    severities: new Set<RuleSeverity>(),
    statuses: new Set<RuleStatus>(),
  };
  const items: Rule[] = Object.values(rulesSpecifications.rules).flatMap((rule => Object.values(rule)));

  items.forEach((rule) => {
    meta.languages.add(rule.language);
    meta.severities.add(rule.severity);
    meta.statuses.add(rule.status);
  });

  const filters = ref({
    languages: createDefaultState(Array.from(meta.languages)),
    severities: createDefaultState(Array.from(meta.severities)),
    statuses: createDefaultState(Array.from(meta.statuses)),
  });

  const filteredRules = computed(() => {
    const { languages, severities, statuses } = filters.value;
    return items.filter(
      (item) =>
        (!isFilterEnabled(languages) || languages[item.language]) &&
        (!isFilterEnabled(severities) || severities[item.severity]) &&
        (!isFilterEnabled(statuses) || statuses[item.status]),
    );
  });

  return { items, meta, filters, filteredRules };
};
