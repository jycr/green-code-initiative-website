<script lang="ts" setup>
import AppBadge from "@/components/shared/AppBadge.vue";
import RuleSeverity from "@/components/rules/RuleSeverity.vue";
import { computed } from "vue";

const { rule } = defineProps<{ rule: Rule }>();
</script>

<template>
  <div class="rule-card">
    <div class="rule-info" :class="rule.status">
      <span class="rule-name">{{ rule.title }}</span>
      <span class="rule-id">{{ rule.key }}</span>
    </div>
    <div class="rule-badges">
      <RuleSeverity :severity="rule.severity" />
      <AppBadge :key="rule.language" :text="rule.language" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.rule-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: var(--shadow-border-small);
  border-radius: 0.5rem;
  padding: 1rem;

  .rule-info {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 1rem;

    &.deprecated {
      color: var(--color-on-surface-bright);
      text-decoration: line-through;
    }

    .rule-name {
      font-weight: bold;
    }

    .rule-id {
      color: var(--color-on-surface-bright);
    }
  }

  .rule-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
}
</style>
