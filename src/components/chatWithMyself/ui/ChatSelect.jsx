import { Check, ChevronDown } from 'lucide-react';
import { Select } from 'radix-ui';
import {
  chatSelectContentClass,
  chatSelectItemClass,
  chatSelectTriggerClass,
} from '@/components/chatWithMyself/ui/chatUiStyles';

/**
 * Radix Select for Chat with Myself.
 * @param {{ value: string, onValueChange: (v: string) => void, options: Array<{ value: string, label: string }>, id?: string, ariaLabel?: string, className?: string, triggerClassName?: string, disabled?: boolean }} props
 */
export default function ChatSelect({
  value,
  onValueChange,
  options = [],
  id,
  ariaLabel = '선택',
  className = '',
  triggerClassName = '',
  disabled = false,
}) {
  return (
    <div className={className}>
      <Select.Root value={value} onValueChange={onValueChange} disabled={disabled}>
        <Select.Trigger
          id={id}
          aria-label={ariaLabel}
          className={`${chatSelectTriggerClass} ${triggerClassName}`}
        >
          <Select.Value />
          <Select.Icon className="text-gray-500">
            <ChevronDown size={14} />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            className={chatSelectContentClass}
            position="popper"
            sideOffset={4}
          >
            <Select.Viewport className="p-1">
              {options.map((opt) => (
                <Select.Item
                  key={opt.value}
                  value={opt.value}
                  className={chatSelectItemClass}
                >
                  <Select.ItemIndicator className="absolute left-1.5 inline-flex items-center">
                    <Check size={12} />
                  </Select.ItemIndicator>
                  <Select.ItemText>{opt.label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}
