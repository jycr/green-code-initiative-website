declare type MemberLinkType = "linkedin" | "github";

declare type Member = {
  name: string;
  company?: string;
  profile: string;
  links: Partial<Record<MemberLinkType, string>>;
};

declare type RuleType =
    | "CODE_SMELL"
    | "BUG"
    | "VULNERABILITY"
    | "SECURITY_HOTSPOT"
    ;

declare type RuleStatus =
    | "ready"
    | "deprecated"
    ;

declare type RuleSeverity =
    | "INFO"
    | "MINOR"
    | "MAJOR"
    | "CRITICAL"
    | "BLOCKER"
    ;

declare type Rule = {
  key: string;
  title: string;
  language: string;
  type: RuleType;
  status: RuleStatus;
  remediation: {
    func: string;
    constantCost: number;
  };
  tags: string[];
  severity: RuleSeverity;
  htmlDescription: string;
  terms: string;
};

declare type RuleMeta = {
  languages: Set<string>;
  severities: Set<RuleSeverity>;
  statuses: Set<RuleStatus>;
};

declare type RulesSpecifications = {
  version: string;
  rules: {
    [ruleKey: string]: {
      [language: string]: Rule
    }
  };
};
