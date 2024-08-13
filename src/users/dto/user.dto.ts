// NestJS
import { ApiProperty } from '@nestjs/swagger';

// Application
import { UserListItemDTO } from "./user-list-item.dto";
import { MD_AutoResponder, MD_Forwarding, MD_UserInfo } from 'node-mdaemon-api';

export class UserDTO
    extends UserListItemDTO {

        AccessType: string;
        AllowChangeViaEmail: boolean;
        AllowTFA: boolean;
        ApplyDomainSignature: boolean;
        ApplyQuotas: boolean;
        AttachmentLinking: boolean;
        AutoDecode: boolean;
        AutoResponder: MD_AutoResponder;
        CanModifyGAB: boolean;
        CheckAddrBook: boolean;
        Comments: string;
        CreatePlaceholderEvents: boolean;
        DeclineConflictingRequests: boolean;
        DeclineRecurringRequests: boolean;
        Domain: string;
        DontExpirePassword: boolean;
        // Email: string;
        EnableAIMessageFeatures: boolean;
        EnableComAgent: boolean;
        EnableInstantMessaging: boolean;
        EnableMultiPOP: boolean;
        EnableSubaddressing: boolean;
        ExemptFromAuthMatch: boolean;
        ExtractInbound: boolean;
        ExtractOutbound: boolean;
        Forwarding: MD_Forwarding;
        // FullName: string;
        Groups: string;
        HideFromEveryone: boolean;
        IsDisabled: boolean;
        IsDomainAdmin: boolean;
        IsForwarding: boolean;
        IsFrozen: boolean;
        KeepForwardedMail: boolean;
        MailDir: string;
        MailFormat: string;
        Mailbox: string;
        MaxDeletedIMAPMessageAge: number;
        MaxDiskSpace: number;
        MaxInactive: number;
        MaxMessageAge: number;
        MaxMessageCount: number;
        MaxSentPerDay: number;
        MultiPOPMaxMessageAge: number;
        MultiPOPMaxMessageSize: number;
        MustChangePassword: boolean;
        NTAccount: string;
        Password: string;
        PasswordEx: string;
        ProcessCalendarRequests: boolean;
        RecurseIMAP: boolean;
        RequireTFA: boolean;
        RestrictIMAPAccess: boolean;
        RestrictPOPAccess: boolean;
        RestrictSMTPAccess: boolean;
        RestrictWAAccess: boolean;
        RestrictWCAccess: boolean;
        SecurePassword: string;
        TemplateFlags: number;
        TemplateName: string;
        UpdateAddrBook: boolean;
        UseDefaultPruning: boolean;
        UserDefined: string;
        WebConfig: number;

        public static marshal(userInfo: MD_UserInfo) {
            const dto = new UserDTO();
            Object.assign(dto, userInfo);
            delete dto.Password;
            delete dto.PasswordEx;
            delete dto.SecurePassword;
            return dto;
        }
    }